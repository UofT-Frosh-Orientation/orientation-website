const Queue = require('bull');
const EmailServices = require('../services/EmailServices');

const passwordResetSubscription = new Queue('passwordReset', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

passwordResetSubscription.process(async (job, done) => {
  console.log('New job');
  console.log(job.data);
  console.log(typeof job.data.token);
  const { token, email } = job.data;
  try {
    const result = await EmailServices.sendTemplateEmail(
      {
        URL: `${process.env.CLIENT_BASE_URL}/password-reset/${token}`,
      },
      'reset_password',
      [email],
      'tech@orientation.skule.ca',
    );
    console.log(result);
    done(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = passwordResetSubscription;
