const Queue = require('bull');
const EmailServices = require('../services/EmailServices');


const newUserSubscription = new Queue('newUser', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

newUserSubscription.process((job, done) => {
  console.log(`New User created!`);

  // sending user creation email
  const result = EmailServices.sendTemplateEmail({firstName: job.data.firstName, lastName: job.data.lastName }, "newUser", [job.data.email], "tech@orientation.skule.ca")

  result.then(response => {
    console.log(response);
  });

  console.log(job.data);
  done();
});

module.exports = newUserSubscription;
