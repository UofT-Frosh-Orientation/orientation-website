const Queue = require('bull');

const newUserSubscription = new Queue('newUser', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

newUserSubscription.process((job, done) => {
  console.log(`New Frosh created!`);
  console.log(job.data);
  done();
});

module.exports = newUserSubscription;
