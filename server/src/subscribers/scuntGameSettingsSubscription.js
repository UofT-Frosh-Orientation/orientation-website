const Queue = require('bull');

const scuntGameSettingsSubscriptions = new Queue('scuntGameSettings', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

module.exports = scuntGameSettingsSubscriptions;
