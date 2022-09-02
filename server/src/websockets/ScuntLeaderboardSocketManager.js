const ScuntTeamServices = require('../services/ScuntTeamServices');

class ScuntLeaderboardSocketManager {
  constructor(io) {
    this.io = io;
    this.sockets = new Map();
    this.teamUpdateTimes = new Map();

    io.on('connection', (socket) => {
      console.log('User connected to leaderboard!');
      this.addSocket(socket);
    });
  }

  addSocket(socket) {
    this.sockets.set(socket.id, socket);
    socket.join('leaderboard');
    socket.on('getScores', () => this.getScores(socket));
    socket.on('disconnect', () => this.sockets.delete(socket.id));
  }

  sendUpdate(team, score) {
    const update = {};
    update[team] = score;
    this.io.to('leaderboard').emit('update', update);
  }

  async getScores(socket) {
    const scores = await ScuntTeamServices.getTeamPoints();
    socket.emit('scores', scores);
  }

  listen(queue) {
    queue.process((job, done) => {
      const {
        timestamp,
        data: { team, score },
      } = job;
      const lastUpdated = this.teamUpdateTimes.get(team) ?? 0;
      if (timestamp >= lastUpdated) {
        this.sendUpdate(team, score);
        this.teamUpdateTimes.set(team, timestamp);
      }
      done();
    });
  }
}

module.exports = ScuntLeaderboardSocketManager;
