const Queue = require('bull');
const EmailServices = require('../services/EmailServices');

const newFroshSubscription = new Queue('newFrosh', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

newFroshSubscription.process((job, done) => {
  console.log('Registered frosh!');
  console.log(job.data);
  try {
    // sending user creation email
    const result = EmailServices.sendTemplateEmail(
      {},
      'registration_confirmation',
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
