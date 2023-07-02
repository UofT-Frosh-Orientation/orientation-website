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
      'html',
      'text',
      'Thank you for registering!',
      [job.data.file],
      [job.data.email],
      'tech@orientation.skule.ca',
    );

    result.then((response) => {
      console.log('finished newFroshSubscription');
      console.log('email API response', response);
    });

    done();
  } catch (error) {
    done(error);
  }
});

module.exports = newFroshSubscription;
