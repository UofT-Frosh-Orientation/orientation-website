class ScuntLeaderboardSocket {
  constructor(io) {
    this.io = io;
  }

  sendUpdate(team, score) {
    const update = {};
    update[team] = score;
    this.io.sockets.emit('update', update);
  }
}

module.exports = ScuntLeaderboardSocket;
