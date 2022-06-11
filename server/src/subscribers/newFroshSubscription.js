const Queue = require('bull');

const newFroshSubscription = new Queue('newFrosh', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD}
});

newFroshSubscription.process((job, done) => {
  console.log("Registered frosh!")
  console.log(job.data)
  done()
})
