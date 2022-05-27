const AWS = require('aws-sdk');

var SES = new AWS.SESV2({ region: 'us-east-1' });

const EmailServices = {
  /**
   * Send normal html email
   * @param {object} emailContent filling guide: https://docs.aws.amazon.com/goto/WebAPI/sesv2-2019-09-27/SendEmail
   * @param {list} toAddresses list of strings containing emails
   * @returns AWS.Request promise
   */
  async sendSimpleEmail(emailContent, toAddresses) {
    const params = {
      Content: {
        Simple: emailContent,
      },
      Destination: {
        ToAddresses: toAddresses,
      },

      FromEmailAddress: 'FROSHEMAIL',
    };

    return SES.sendEmail(params).promise();
  },

  /**
   * Create and save an email template
   * @param {string} templateName
   * @param {string} html
   * @param {string} subject
   * @param {string} text
   * @returns AWS.Request promise
   */
  async createTemplate(templateName, html, subject, text) {
    /* Template Creation Guild: https://aws.amazon.com/blogs/messaging-and-targeting/introducing-email-templates-and-bulk-sending/ */
    const params = {
      TemplateContent: {
        Html: html,
        Subject: subject,
        Text: text,
      },
      TemplateName: templateName,
    };

    return SES.createTemplate(params).promise();
  },

  /**
   * Send a tempalted email with fillable variables
   * @param {string} templateData example: "{ \"name\":\"Alejandro\", \"favoriteanimal\": \"zebra\" }"
   * @param {string} templateName
   * @param {list} toAddresses list of strings containing emails
   * @returns AWS.Request promise
   */
  async sendTemplateEmail(templateData, templateName, toAddresses) {
    // const { templateData, templateName, toAddresses } = req.body;

    const params = {
      Content: {
        Template: {
          TemplateData: templateData,
          TemplateName: templateName,
        },
      },
      Destination: {
        ToAddresses: toAddresses /* must be list */,
      },

      FromEmailAddress: 'FROSHEMAIL',

      ReplyToAddresses: [
        'FROSHEMAIL',
        /* more items */
      ],
    };

    return SES.sendEmail(params).promise();
    // SES.sendEmail(params, function (err, data) {
    //   if (err) next(err); // an error occurred
    //   else res.status(200).send({ message: 'Email Sent!', respondeData: data }); // successful response
    // });
  },

  /**
   * Send bulk personalized template emails
   * @param {object} bulkEmailEntries filling guide: https://docs.aws.amazon.com/goto/WebAPI/sesv2-2019-09-27/SendBulkEmail
   * @param {string} templateName
   * @param {string} templateData defult template data to be filled in
   * @returns AWS.Request promise
   */
  async sendBulkTemplateEmail(bulkEmailEntries, templateName, templateData) {
    const params = {
      BulkEmailEntries: bulkEmailEntries,
      DefaultContent: {
        Template: {
          TemplateData: templateData,
          TemplateName: templateName,
        },
      },

      FromEmailAddress: 'FROSHEMAIL',
    };
    return SES.sendBulkEmail(params).promise();
  },

  /**
   * Send raw MIME format email which can include attachments
   * @param {string} MIMEstring Base64 encoded MIME format message
   * @param {list} toAddresses list of email addresses to send to
   * @returns AWS.Request promise
   */
  async sendRawEmail(MIMEstring, toAddresses) {
    const params = {
      Content: {
        Raw: {
          Data: Buffer.from(MIMEstring),
        },
      },
      Destination: {
        ToAddresses: toAddresses /* must be list */,
      },

      FromEmailAddress: 'FROSHEMAIL',
    };

    return SES.sendEmail(params).promise();
  },
};

module.exports = EmailServices;
