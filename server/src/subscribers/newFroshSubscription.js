const Queue = require('bull');
const EmailServices = require('../services/EmailServices');

const newFroshSubscription = new Queue('newFrosh', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

newFroshSubscription.process((job, done) => {
  console.log('started newFroshSubscription', job.data);
  try {
    // sending user creation email
    const result = EmailServices.sendRawEmailMulterFiles(
      `<html>
        <head>
          <style>
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-size: 14px;
              line-height: 1.42857143;
              color: #fff;
              background-color: #28093A;
            }
          </style>
        </head>
        <body>
          <img src="cid:banner" alt="Email banner"/>
          <p>Hi ${job.data.preferredName},</p>
          <p>Thank you for registering for F!rosh Week 2T3!!!</p>
          <p>Please find attached your information PDF which includes a receipt of your data and your unique QR code that you will use for a variety of activities during F!rosh Week.</p>
          <p>We look forward to seeing you soon!</p>
          <p>If you have any questions or want to learn more feel free to email us at
            <a href="mailto:froshweek@orientation.skule.ca">froshweek@orientation.skule.ca</a>!</p>
          <p>With HYPE,</p>
          <p>F!rosh Week Orientation Committee</p>
        </body>
      </html>`,
      ' ',
      'Thank you for registering!',
      [job.data.file],
      [job.data.email],
      'tech@orientation.skule.ca',
    );

    result.then((response) => {
      console.log('finished newFroshSubscription');
      console.log('email API response:', response);
    });

    done();
  } catch (error) {
    done(error);
  }
});

module.exports = newFroshSubscription;
