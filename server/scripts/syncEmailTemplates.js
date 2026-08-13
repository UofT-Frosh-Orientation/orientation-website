/**
 * Pushes the email templates in src/services/emailTemplates to AWS SES.
 *
 * The repo is the source of truth for template content; SES just holds a copy
 * so that SendBulkEmail can render it. Run this after editing any template:
 *
 *   node scripts/syncEmailTemplates.js            # push
 *   node scripts/syncEmailTemplates.js --dry-run  # show what would change
 *
 * Credentials come from the environment (as they do in the container). When
 * running locally, the repo-root .env is used as a fallback. This script never
 * sends email.
 */
const fs = require('fs');
const path = require('path');
const {
  SESv2Client,
  GetEmailTemplateCommand,
  CreateEmailTemplateCommand,
  UpdateEmailTemplateCommand,
} = require('@aws-sdk/client-sesv2');

const REGION = 'ca-central-1';
const TEMPLATE_DIR = path.join(__dirname, '..', 'src', 'services', 'emailTemplates');

// Subjects live here rather than in the HTML because SES stores them separately.
const TEMPLATES = [
  { name: 'announcement', file: 'announcement.html', subject: 'Announcement: {{name}}' },
  { name: 'unsubscribed', file: 'unsubscribed.html', subject: 'You Have Been Unsubscribed' },
];

const dryRun = process.argv.includes('--dry-run');

function loadRootEnvFallback() {
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) return;
  const envPath = path.join(__dirname, '..', '..', '.env');
  if (!fs.existsSync(envPath)) return;
  for (let line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;
    const i = line.indexOf('=');
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadRootEnvFallback();

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error('AWS credentials not found in environment or repo-root .env');
  process.exit(1);
}

const SES = new SESv2Client({ region: REGION });

async function sync({ name, file, subject }) {
  const html = fs.readFileSync(path.join(TEMPLATE_DIR, file), 'utf8');
  const TemplateContent = { Subject: subject, Html: html };

  let existing = null;
  try {
    const current = await SES.send(new GetEmailTemplateCommand({ TemplateName: name }));
    existing = current.TemplateContent || {};
  } catch (e) {
    if (!/NotFound/i.test(e.name || '')) throw e;
  }

  if (existing && existing.Html === html && existing.Subject === subject) {
    console.log(`  ${name}: already up to date`);
    return;
  }

  const action = existing ? 'update' : 'create';
  if (dryRun) {
    console.log(
      `  ${name}: would ${action} (${existing ? existing.Html.length : 0} -> ${html.length} bytes)`,
    );
    return;
  }

  if (existing) {
    await SES.send(new UpdateEmailTemplateCommand({ TemplateName: name, TemplateContent }));
  } else {
    await SES.send(new CreateEmailTemplateCommand({ TemplateName: name, TemplateContent }));
  }
  console.log(`  ${name}: ${action}d (${html.length} bytes)`);
}

(async () => {
  console.log(`Syncing templates to SES (${REGION})${dryRun ? ' [DRY RUN]' : ''}`);
  let failed = 0;
  for (const template of TEMPLATES) {
    try {
      await sync(template);
    } catch (e) {
      failed++;
      console.error(`  ${template.name}: FAILED — ${e.name}: ${e.message}`);
    }
  }
  if (failed) process.exit(1);
  console.log('Done. No emails were sent.');
})();
