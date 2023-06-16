const Queue = require('bull');
const EmailServices = require('../services/EmailServices');

const newUserSubscription = new Queue('existingUser', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

newUserSubscription.process((job, done) => {
  try {
    // sending successful user creation email
    const result = EmailServices.sendTemplateEmail(
      {},
      'signup_confirmation',
      [job.data.email],
      'tech@orientation.skule.ca',
    ); 
    done();
  } catch (error) {
    done(error);
  }
});

module.exports = newUserSubscription;