const {
  SESv2Client,
  CreateEmailTemplateCommand,
  SendBulkEmailCommand,
  SendEmailCommand,
} = require('@aws-sdk/client-sesv2');
const mime = require('mime');
const mimemessage = require('mimemessage');
const fs = require('fs').promises;
const path = require('path');
const SES = new SESv2Client({ region: 'ca-central-1' });

const EmailServices = {
  /**
   * Send a simple text/html email
   * @param {String[]} toAddresses an array of email addresses the email should be sent to
   * @param {String} html a message string comprised of html
   * @param {String} text a message string comprised of text
   * @param {String} subject the subject of the email
   * @param {String} fromAddress the email adress the email is being sent from
   * @returns {Promise} promise
   */
  async sendSimpleEmail(toAddresses, html, text, subject, fromAddress) {
    if (html) {
      const params = {
        Content: {
          Simple: {
            Body: {
              Html: {
                Data: html,
              },
            },
            Subject: {
              Data: subject,
            },
          },
        },
        Destination: {
          ToAddresses: toAddresses,
        },

        FromEmailAddress: fromAddress,
      };
      const command = new SendEmailCommand(params);
      return SES.send(command);
    } else {
      const params = {
        Content: {
          Simple: {
            Body: {
              Text: {
                Data: text,
              },
            },
            Subject: {
              Data: subject,
            },
          },
        },
        Destination: {
          ToAddresses: toAddresses,
        },

        FromEmailAddress: fromAddress,
      };
      const command = new SendEmailCommand(params);

      return SES.send(command);
    }
  },

  /**
   * Create and save an email template
   * @param {String} templateName name of the new template
   * @param {String} html html body
   * @param {String} subject subject of the email
   * @param {String} text text body
   * @see {@link https://aws.amazon.com/blogs/messaging-and-targeting/introducing-email-templates-and-bulk-sending/} for the filling of `html` and `text`
   * @returns {Promise} promise
   */
  async createTemplate(templateName, html, subject, text) {
    const params = {
      TemplateContent: {
        Html: html,
        Subject: subject,
        Text: text,
      },
      TemplateName: templateName,
    };

    const command = new CreateEmailTemplateCommand(params);

    return SES.send(command);
  },

  /**
   * Send a tempalted email with fillable variables
   * @param {Object} templateData data to be filled in the template
   * @param {String} templateName name of the template used
   * @param {String[]} toAddresses array of strings containing emails
   * @param {String} fromAddress the email adress the email is being sent from
   * @returns {Promise} promise
   */
  async sendTemplateEmail(templateData, templateName, toAddresses, fromAddress) {
    const params = {
      Content: {
        Template: {
          TemplateData: JSON.stringify(templateData),
          TemplateName: templateName,
        },
      },
      Destination: {
        ToAddresses: toAddresses,
      },

      FromEmailAddress: fromAddress,
    };

    const command = new SendEmailCommand(params);

    return SES.send(command);
  },

  /**
   * Send bulk personalized template emails
   * @param {Object[]} bulkEmailEntries an array containing arrays of email addresses
   * @param {String} templateName name of template used
   * @param {Object} defaultTemplateData defult data to be filled in the template
   * @param {String} fromAddress the email adress the email is being sent from
   * @returns {Promise} promise
   */
  async sendBulkTemplateEmail(bulkEmailEntries, templateName, defaultTemplateData, fromAddress) {
    const params = {
      BulkEmailEntries: bulkEmailEntries.map((entry) => {
        return {
          Destination: {
            ToAddresses: [...entry],
          },
        };
      }),
      DefaultContent: {
        Template: {
          TemplateData: JSON.stringify(defaultTemplateData),
          TemplateName: templateName,
        },
      },

      FromEmailAddress: fromAddress,
    };

    const command = new SendBulkEmailCommand(params);

    return SES.send(command);
  },

  /**
   * Send raw MIME format email which can include attachments
   * @param {String} html html part of the message
   * @param {String} text text part of the message
   * @param {String} subject subject of the email
   * @param {String[]} attachments an array of file paths
   * @param {String[]} toAddresses array of email addresses to send to
   * @param {String} fromAddress the email adress the email is being sent from
   * @returns {Promise} promise
   */
  async sendRawEmail(html, text, subject, attachments, toAddresses, fromAddress) {
    const msg = mimemessage.factory({
      contentType: 'multipart/mixed',
      body: [],
    });
    msg.header('From', fromAddress);
    msg.header('To', toAddresses);
    msg.header('Subject', subject);
    const alternateEntity = mimemessage.factory({
      contentType: 'multipart/alternate',
      body: [],
    });

    const htmlEntity = mimemessage.factory({
      contentType: 'text/html;charset=utf-8',
      body: html,
    });

    const plainEntity = mimemessage.factory({
      body: text,
    });

    alternateEntity.body.push(htmlEntity);
    alternateEntity.body.push(plainEntity);

    msg.body.push(alternateEntity);

    for (const filePath of attachments) {
      const filemime = mime.getType(path.basename(filePath));

      const fileData = await fs.readFile(filePath, {
        encoding: 'base64',
      });

      const attachment = mimemessage.factory({
        contentType: filemime,
        contentTransferEncoding: 'base64',
        body: fileData,
      });

      attachment.header('Content-Disposition', `attachment ;filename="${path.basename(filePath)}"`);

      msg.body.push(attachment);
    }

    const params = {
      Content: {
        Raw: {
          Data: Buffer.from(msg.toString(), 'ascii'),
        },
      },
      Destination: {
        ToAddresses: toAddresses,
      },

      FromEmailAddress: fromAddress,
    };

    const command = new SendEmailCommand(params);

    return SES.send(command);
  },

  async sendStreamAttachedEmail(html, text, subject, streams, toAddresses, fromAddress) {
    const msg = mimemessage.factory({
      contentType: 'multipart/mixed',
      body: [],
    });
    msg.header('From', fromAddress);
    msg.header('To', toAddresses);
    msg.header('Subject', subject);
    const alternateEntity = mimemessage.factory({
      contentType: 'multipart/alternate',
      body: [],
    });

    const htmlEntity = mimemessage.factory({
      contentType: 'text/html;charset=utf-8',
      body: html,
    });

    const plainEntity = mimemessage.factory({
      body: text,
    });

    alternateEntity.body.push(htmlEntity);
    alternateEntity.body.push(plainEntity);

    msg.body.push(alternateEntity);

    for (const stream of streams) {
      const attachment = mimemessage.factory({
        contentType: 'application/pdf',
        contentTransferEncoding: 'base64',
        body: stream, // stream itself
      });

      attachment.header('Content-Disposition', `attachment ;filename="${stream}"`);

      msg.body.push(attachment);
    }

    const params = {
      Content: {
        Raw: {
          Data: Buffer.from(msg.toString(), 'ascii'),
        },
      },
      Destination: {
        ToAddresses: toAddresses,
      },

      FromEmailAddress: fromAddress,
    };

    const command = new SendEmailCommand(params);

    return SES.send(command);
  },
};

module.exports = EmailServices;
