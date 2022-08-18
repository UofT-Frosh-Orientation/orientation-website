const Queue = require('bull');
const EmailServices = require('../services/EmailServices');
const UserServices = require('../services/UserServices');

const announcementSubscription = new Queue('newFrosh', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

announcementSubscription.process((job, done) => {
  console.log('Announcement Created!');
  console.log(job.data);
  try {
    const bulkEmailEntries = [];

    UserServices.getAllUsers().then((users) => {
      let count = 0;
      let entries = [];
      users.forEach((user) => {
        if (user.canEmail === true) {
          count++;
          entries.push(user.email);
          console.log(entries);

          if (count === 20) {
            bulkEmailEntries.push(entries);
            count = 0;
            entries = [];
          }
        }
      });
      if (entries.length > 0) {
        bulkEmailEntries.push(entries);
      }
      console.log(bulkEmailEntries);

      const result = EmailServices.sendBulkTemplateEmail(
        bulkEmailEntries,
        'announcement',
        { name: job.name, description: job.description },
        'tech@orientation.skule.ca',
      );

      result.then((response) => {
        console.log('response:');
        console.log(response);
      });

      done();
    });
  } catch (error) {
    done(error);
  }
});

module.exports = announcementSubscription;
