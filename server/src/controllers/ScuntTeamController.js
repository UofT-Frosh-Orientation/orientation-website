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

  async getScuntJudges(req, res, next) {
    try {
      const judgeUsers = await ScuntTeamServices.getScuntJudges();
      return res.status(200).send({ message: 'Successfuly found judge users', users: judgeUsers });
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  async refillBribePoints(req, res, next) {
    try {
      const { judgeUserId, points, isAddPoints = false } = req.body;
      await ScuntTeamServices.refillBribePoints(judgeUserId, points, isAddPoints);
      return res.status(200).send({
        message: (isAddPoints ? 'Added ' : 'Set ') + points?.toString() + ' bribe points',
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  async addTransaction(req, res, next) {
    try {
      const { teamNumber, missionNumber, points } = req.body;
      const result = await ScuntTeamServices.addTransaction(teamNumber, missionNumber, points);
      return res.status(200).send({
        message: result,
      });
    } catch (e) {
      next(e);
    }
  },
  async subtractTransaction(req, res, next) {
    try {
      const { teamNumber, points } = req.body;
      await ScuntTeamServices.subtractTransaction(teamNumber, points);
      return res.status(200).send({
        message:
          'Successfully subtracted ' +
          points.toString() +
          ' points for team ' +
          teamNumber.toString(),
      });
    } catch (e) {
      next(e);
    }
  },
  async viewTransactions(req, res, next) {
    try {
      const { teamNumber, showMostRecent } = req.body;
      let result;
      if (showMostRecent) {
        result = await ScuntTeamServices.viewRecentTransactions();
      } else {
        result = await ScuntTeamServices.viewTransactions(teamNumber);
      }
      return res.status(200).send({
        transactions: result,
      });
    } catch (e) {
      next(e);
    }
  },

  async checkTransaction(req, res, next) {
    try {
      const { teamNumber, missionNumber } = req.body;
      const maxPoints = await ScuntTeamServices.checkTransaction(teamNumber, missionNumber);
      return res.status(200).send({
        message: 'Found status for this mission',
        missionStatus: { completed: maxPoints !== 0, points: maxPoints },
      });
    } catch (e) {
      next(e);
    }
  },

  async intializeTeams(req, res, next) {
    try {
      const createdTeams = await ScuntTeamServices.initializeTeams();
      res.status(200).send({ message: `Successfully created ${createdTeams.length} teams!` });
    } catch (e) {
      next(e);
    }
  },

  async deleteTransaction(req, res, next) {
    try {
      const { id, teamNumber } = req.body;
      await ScuntTeamServices.deleteTransaction(teamNumber, id);
      res.status(200).send({ message: 'Successfully deleted the transaction!' });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = ScuntTeamController;
