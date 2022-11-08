const ScuntTeamServices = require('../services/ScuntTeamServices');
const ScuntGameSettingServices = require('../services/ScuntGameSettingsServices');

class ScuntLeaderboardSocketManager {
  constructor(io) {
    this.io = io;
    this.sockets = new Map();
    this.teamUpdateTimes = new Map();
    this.settings = {};

    io.on('connection', (socket) => {
      console.log('User connected to leaderboard!');
      this.addSocket(socket);
    });
  }

  async initSettings() {
    const currentSettings = await ScuntGameSettingServices.getGameSettings();
    this.settings = currentSettings[0];
  }

  addSocket(socket) {
    this.sockets.set(socket.id, socket);
    socket.join('leaderboard');
    socket.on('getScores', () => this.getScores(socket));
    socket.on('disconnect', () => this.sockets.delete(socket.id));
    console.log(`${this.sockets.size} connections to the leaderboard`);
  }

  sendUpdate(team, points) {
    this.io.to('leaderboard').emit('update', team, points);
  }

  async getScores(socket) {
    console.log('Getting scores!');
    console.log(this.settings.revealLeaderboard);
    if (this.settings.revealLeaderboard) {
      const scores = await ScuntTeamServices.getTeamPoints();
      socket.emit('scores', scores);
    }
  }

  listenToScores(queue) {
    queue.process((job, done) => {
      const {
        timestamp,
        data: { team, score },
      } = job;
      const lastUpdated = this.teamUpdateTimes.get(team) ?? 0;
      if (timestamp >= lastUpdated && this.settings.revealLeaderboard) {
        this.sendUpdate(team, score);
        this.teamUpdateTimes.set(team, timestamp);
      }
      done();
    });
  }

  listenToSettings(queue) {
    queue.process((job, done) => {
      try {
        console.log('Settings update');
        console.log(job.data);
        const newSettings = job.data;
        if (!newSettings) {
          return done();
        } else if (newSettings.revealLeaderboard) {
          console.log('Revealing leaderboard!');
          ScuntTeamServices.getTeamPoints().then((scores) => {
            console.log('team scores');
            console.log(scores);
            this.io.to('leaderboard').emit('scores', scores);
            this.settings = newSettings ?? this.settings;
            return done();
          });
        } else {
          this.settings = newSettings ?? this.settings;
          console.log(this.settings);
          return done();
        }
      } catch (e) {
        console.log(e);
        done();
      }
    });
  }
}

module.exports = ScuntLeaderboardSocketManager;
