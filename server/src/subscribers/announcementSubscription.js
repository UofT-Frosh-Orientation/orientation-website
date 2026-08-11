const Queue = require('bull');
const EmailServices = require('../services/EmailServices');
const UserServices = require('../services/UserServices');

const announcementSubscription = new Queue('newAnnouncement', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

const FROM_ADDRESS = 'tech@orientation.skule.ca';

// SES accepts at most 50 entries per SendBulkEmail call.
const MAX_BULK_ENTRIES = 50;
// The account ceiling is 14 messages/sec; stay under it so a burst never trips
// throttling, since each entry in a batch counts as one message.
const TARGET_SEND_RATE = 12;
const MAX_BATCH_ATTEMPTS = 3;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isThrottling = (error) => /Throttling|TooManyRequests|LimitExceeded/i.test(error?.name || '');

/**
 * Sends one batch, retrying only when SES throttles us.
 * @returns {Promise<Object>} the SendBulkEmail response
 */
async function sendBatchWithRetry(batch, defaultTemplateData) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await EmailServices.sendBulkTemplateEmail(
        batch,
        'announcement',
        defaultTemplateData,
        FROM_ADDRESS,
      );
    } catch (error) {
      if (!isThrottling(error) || attempt >= MAX_BATCH_ATTEMPTS) throw error;
      const backoff = 1000 * 2 ** (attempt - 1);
      console.log(`Throttled by SES, retrying batch in ${backoff}ms (attempt ${attempt})`);
      await sleep(backoff);
    }
  }
}

announcementSubscription.process(async (job, done) => {
  console.log('Announcement Created!');

  if (job.data.unsubed === true) {
    try {
      await EmailServices.sendTemplateEmail({}, 'unsubscribed', [job.data.email], FROM_ADDRESS);
      done();
    } catch (error) {
      done(error);
    }
    return;
  }

  try {
    // Older announcements queued before audiences existed carry no value.
    const audience = job.data.audience || 'all';
    const users = await UserServices.getEmailRecipients(audience);

    // One entry per recipient: SES renders a personalized copy for each and no
    // one appears in anyone else's To header.
    const recipients = users
      .filter((user) => user.email)
      .map((user) => ({
        email: user.email,
        templateData: { firstName: user.preferredName || user.firstName || 'F!rosh' },
      }));

    if (recipients.length === 0) {
      console.log(`Announcement email: no recipients for audience "${audience}", nothing to send`);
      done();
      return;
    }

    // Fills any tag an entry does not override, including firstName if a user
    // record somehow has no usable name.
    const defaultTemplateData = {
      name: job.data.name,
      description: job.data.description,
      firstName: 'F!rosh',
    };

    const batches = [];
    for (let i = 0; i < recipients.length; i += MAX_BULK_ENTRIES) {
      batches.push(recipients.slice(i, i + MAX_BULK_ENTRIES));
    }

    console.log(
      `Announcement email: audience "${audience}", ${recipients.length} recipients in ` +
        `${batches.length} batches at ~${TARGET_SEND_RATE}/sec`,
    );

    let succeeded = 0;
    let failed = 0;
    const startedAt = Date.now();

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      try {
        const response = await sendBatchWithRetry(batch, defaultTemplateData);
        // SES reports per-recipient outcomes here; a 200 does not mean every
        // message was accepted. Addresses are kept out of the logs on purpose.
        for (const result of response.BulkEmailEntryResults || []) {
          if (result.Status === 'SUCCESS') {
            succeeded++;
          } else {
            failed++;
            console.error(`Announcement email rejected: ${result.Status} ${result.Error || ''}`);
          }
        }
      } catch (error) {
        // Keep going so one bad batch cannot silently drop the rest of the list.
        failed += batch.length;
        console.error(`Announcement batch ${i + 1}/${batches.length} failed: ${error.message}`);
      }

      if (i < batches.length - 1) {
        await sleep((batch.length / TARGET_SEND_RATE) * 1000);
      }
    }

    const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
    console.log(`Announcement email finished: ${succeeded} sent, ${failed} failed, ${elapsed}s`);
    done();
  } catch (error) {
    done(error);
  }
});

module.exports = announcementSubscription;
