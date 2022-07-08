const Queue = require('bull');
const EmailServices = require('../services/EmailServices');

const newUserSubscription = new Queue('newUser', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

newUserSubscription.process((job, done) => {
  console.log(`New User created!`);
  console.log(job.data);
  try {
    // sending user creation email
    const result = EmailServices.sendTemplateEmail(
      {},
      'signup_conformation',
      [job.data.email],
      'tech@orientation.skule.ca',
    );

    result.then((response) => {
      console.log(response);
    });

    done();
  } catch (error) {
    done(error);
  }
});

module.exports = newUserSubscription;
