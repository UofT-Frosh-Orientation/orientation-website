const Queue = require('bull');
const EmailServices = require('../services/EmailServices');
const UserServices = require('../services/UserServices');

const announcementSubscription = new Queue('newAnnouncement', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

announcementSubscription.process((job, done) => {
  console.log('Announcement Created!');

  if (job.data.unsubed === true) {
    try {
      const result = EmailServices.sendTemplateEmail(
        {},
        'unsubscribed',
        [job.data.email],
        'tech@orientation.skule.ca',
      );

      result.then((response) => {
        console.log(response);
        done();
      });
    } catch (error) {
      done(error);
    }
  } else {
    try {
      const bulkEmailEntries = [];

      UserServices.getAllUsers().then((users) => {
        let count = 0;
        let entries = [];
        users.forEach((user) => {
          if (user.canEmail === true) {
            count++;
            entries.push(user.email);

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
        const result = EmailServices.sendBulkTemplateEmail(
          bulkEmailEntries,
          'announcement',
          { name: job.data.name, description: job.data.description },
          'tech@orientation.skule.ca',
        );

        result.then((response) => {
          console.log('email API response:', response);
          done();
        });
      });
    } catch (error) {
      done(error);
    }
  }
});

module.exports = announcementSubscription;
