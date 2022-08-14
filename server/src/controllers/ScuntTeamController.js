const ScuntTeamServices = require('../services/ScuntTeamServices');

const ScuntTeamController = {
  async getTeamPoints(req, res, next) {
    try {
      const teamPoints = await ScuntTeamServices.getTeamPoints();
      return res.status(200).send({ message: 'Team points', teamPoints });
    } catch (e) {
      next(e);
    }
  },
  async bribeTransaction(req, res, next) {
    try {
      const { teamNumber, points } = req.body;
      // const userId = req.user.id;
      const { leadur } = await ScuntTeamServices.bribeTransaction(teamNumber, points, req.user);
      return res.status(200).send({
        message:
          'Successfully added bribe points for team #' +
          teamNumber.toString() +
          ' of ' +
          points.toString(),
        user: leadur,
      });
    } catch (e) {
      next(e);
    }
  },
  async refillBribePoints(req, res, next) {
    try {
      const judgeUserId = req.judgeUserId;
      const points = req.points;
      const isAddPoints = req.addPoints ? req.addPoints : false;
      await ScuntTeamServices.refillBribePoints(judgeUserId, points, isAddPoints);
      return res
        .status(200)
        .send({ message: 'Successfully refilled bribe points of ' + points.toString() });
    } catch (e) {
      next(e);
    }
  },
  async addTransaction(req, res, next) {
    try {
      const team = req.team;
      const missionNumber = req.missionNumber;
      const points = req.points;
      await ScuntTeamServices.addTransaction(team, missionNumber, points);
      return res.status(200).send({
        message:
          'Successfully added ' +
          points.toString() +
          ' points for team ' +
          team.toString() +
          ' for completing ' +
          missionNumber.toString(),
      });
    } catch (e) {
      next(e);
    }
  },
  async subtractTransaction(req, res, next) {
    try {
      const team = req.team;
      const points = req.points;
      await ScuntTeamServices.subtractTransaction(team, points);
      return res.status(200).send({
        message:
          'Successfully subtracted ' + points.toString() + ' points for team ' + team.toString(),
      });
    } catch (e) {
      next(e);
    }
  },
  async checkTransaction(req, res, next) {
    try {
      const team = req.team;
      const missionNumber = req.missionNumber;
      const missionStatus = await ScuntTeamServices.checkTransaction(team, missionNumber);
      return res.status(200).send({ message: 'Found status for this mission', missionStatus });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = ScuntTeamController;
