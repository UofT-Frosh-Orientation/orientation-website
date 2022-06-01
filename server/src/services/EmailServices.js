const {
  SESv2Client,
  CreateEmailTemplateCommand,
  SendBulkEmailCommand,
  SendEmailCommand,
} = require('@aws-sdk/client-sesv2');
var toUint8Array = require('base64-to-uint8array');

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
   * @param {String} templateData data to be filled in the template example: "{ \"name\":\"Alejandro\", \"favoriteanimal\": \"zebra\" }"
   * @param {String} templateName name of the template used
   * @param {String[]} toAddresses list of strings containing emails
   * @param {String} fromAddress the email adress the email is being sent from
   * @returns {Promise} promise
   */
  async sendTemplateEmail(templateData, templateName, toAddresses, fromAddress) {
    const params = {
      Content: {
        Template: {
          TemplateData: templateData,
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
   * @param {Object[]} bulkEmailEntries an array of objects each containing an array of email addresses and a string of template data
   * @param {String} templateName name of template used
   * @param {String} defaultTemplateData defult data to be filled in the template
   * @param {String} fromAddress the email adress the email is being sent from
   * @returns {Promise} promise
   */
  async sendBulkTemplateEmail(bulkEmailEntries, templateName, defaultTemplateData, fromAddress) {

    const params = {
      BulkEmailEntries: bulkEmailEntries.map((entry) => {
        return {
          Destination: {
            ToAddresses: entry.toAddresses,
          },
          ReplacementEmailContent: {
            ReplacementTemplate: {
              ReplacementTemplateData: entry.templateData,
            },
          },
        };
      }),
      DefaultContent: {
        Template: {
          TemplateData: defaultTemplateData,
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
   * @param {String} MIMEstring Base64 encoded MIME format message
   * @param {String[]} toAddresses list of email addresses to send to
   * @param {String} fromAddress the email adress the email is being sent from
   * @returns {Promise} promise
   */
  async sendRawEmail(MIMEstring, toAddresses, fromAddress) {
    const params = {
      Content: {
        Raw: {
          Data: toUint8Array(MIMEstring),
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
