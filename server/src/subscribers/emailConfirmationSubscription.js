const Queue = require('bull');
const EmailServices = require('../services/EmailServices');
const jwt = require('jsonwebtoken');

const emailConfirmationSubscription = new Queue('newUser', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

emailConfirmationSubscription.process((job, done) => {
  try {
    // sending user email verification link
    const emailToken = jwt.sign(
      job.data.email,
      process.env.JWT_EMAIL_CONFIRMATION_TOKEN,
    );
    const url = process.env.CLIENT_BASE_URL + '/verify-user-email/' + job.data.email + '/' + emailToken;
    EmailServices.sendSimpleEmail(
       [job.data.email],
       '',
       'Please use this URL to confirm your email: ' + url,
       'F!rosh Email Confirmation',
       'tech@orientation.skule.ca',
    );
    done();
  } catch (error) {
    done(error);
  }
});

module.exports = emailConfirmationSubscription;