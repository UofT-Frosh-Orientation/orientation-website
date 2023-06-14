const Queue = require('bull');
const EmailServices = require('../services/EmailServices');
const jwt = require('jsonwebtoken');

const newUserSubscription = new Queue('newUser', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

newUserSubscription.process(async (job, done) => {
  try {
    // sending user email verification link
    const emailToken = jwt.sign(
      [job.data.email],
      process.env.JWT_RESET_TOKEN,
    );
    const url = process.env.CLIENT_BASE_URL + '/verify-user-email/' + email + '/' + emailToken;
    await EmailServices.sendSimpleEmail(
       [job.data.email],
       '',
       'Please use this URL to confirm your email: ' + url,
       'F!rosh Email Confirmation',
       'tech@orientation.skule.ca',
    ).then(() => {
      try {
        // sending user creation email
        const result = EmailServices.sendTemplateEmail(
          {},
          'signup_confirmation',
          [job.data.email],
          'tech@orientation.skule.ca',
        ); 
      } catch (error) {
        done(error);
      }
    });
    done();
  } catch (error) {
    done(error);
  }
});

module.exports = newUserSubscription;
