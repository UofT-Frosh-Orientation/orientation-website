const Queue = require('bull');

const leaderboardSubscription = new Queue('leaderboard', {
  redis: { port: process.env.REDIS_PORT, host: 'redis', password: process.env.REDIS_PASSWORD },
});

module.exports = leaderboardSubscription;
