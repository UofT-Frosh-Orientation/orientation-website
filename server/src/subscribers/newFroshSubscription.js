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
      `html`,
      `Hello ${job.data.name}! \n\n Thank you for registering for F!rosh Week 2T3! \n\n Please find attached your F!rosh Week 2T3 data receipt, it has a copy of your QR code that you'll need for a variety of your F!rosh Week activities. \n\n We look forward to seeing you soon! \n\n For further information please consult your profile page on https://orientaion.skule.ca \n\n\n\n Sincerely, \n\n The F!rosh Week 2T3 Team`,
      'Congratulation on registering for F!rosh Week 2T3',
      [job.data.file],
      [job.data.email],
      'tech@orientation.skule.ca',
    );

    result.then((response) => {
      console.log('finished newFroshSubscription');
      console.log('email API response:', response);
    });

    done();
  } catch (error) {
    done(error);
  }
});

module.exports = newFroshSubscription;
