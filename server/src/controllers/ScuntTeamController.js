const ScuntTeamServices = require('../services/ScuntTeamServices');

const ScuntTeamController = {
  async updateLeaderTeam(req, res, next) {
    const userId = req.user.id;
    const { teamNumber } = req.body;

    try {
      const leadur = await ScuntTeamServices.updateLeaderTeam(userId, teamNumber);
      return res.status(200).send({
        message: 'Successfully updated Scunt Team!',
        user: leadur.getResponseObject(),
      });
    } catch (e) {
      req.log.fatal({
        msg: 'Unable to update leader team for user ' + userId,
        e,
        user: req.user.getResponseObject(),
      });
      next(e);
    }
  },
  async getTeamPoints(req, res, next) {
    try {
      const teamPoints = await ScuntTeamServices.getTeamPoints();
      return res.status(200).send({ message: 'Team points', teamPoints });
    } catch (e) {
      req.log.fatal({ msg: 'Unable to get team points', e });
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
      req.log.fatal({ msg: 'Unable to process bribe transaction', e });
      next(e);
    }
  },

  async getScuntJudges(req, res, next) {
    try {
      const judgeUsers = await ScuntTeamServices.getScuntJudges();
      return res.status(200).send({ message: 'Successfuly found judge users', users: judgeUsers });
    } catch (e) {
      req.log.fatal({ msg: 'Unable to get scunt judges', e });
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
      req.log.fatal({ msg: 'Unable to refill bribe points', e });
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
      req.log.fatal({ msg: 'Unable to add scunt team transaction', e });
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
      req.log.fatal({ msg: 'Unable to subtract scunt team transaction', e });
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
      req.log.fatal({ msg: 'Unable to view scunt team transactions', e });
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
      req.log.fatal({ msg: 'Unable to check scunt team transaction', e });
      next(e);
    }
  },

  async intializeTeams(req, res, next) {
    try {
      const createdTeams = await ScuntTeamServices.initializeTeams();
      res.status(200).send({ message: `Successfully created ${createdTeams.length} teams!` });
    } catch (e) {
      req.log.fatal({ msg: 'Unable to initialize scunt teams', e });
      next(e);
    }
  },

  async deleteTransaction(req, res, next) {
    try {
      const { id, teamNumber } = req.body;
      await ScuntTeamServices.deleteTransaction(teamNumber, id);
      res.status(200).send({ message: 'Successfully deleted the transaction!' });
    } catch (e) {
      req.log.fatal({ msg: 'Unable to delete scunt team transaction ' + id, e });
      next(e);
    }
  },

  async renameScuntTeams(req, res, next) {
    const teamObjs = req.body.teamObjs;
    try {
      teamObjs.map(
        async (teamObj, index) =>
          await ScuntTeamServices.setTeamName(teamObjs[index]['number'], teamObjs[index]['name']),
      );
      console.log('Successfully renamed scunt teams!');
      res.status(200).send({ message: `Successfully renamed scunt teams!` });
    } catch (e) {
      req.log.error({ msg: 'Unable to rename scunt teams', e });
      next(e);
    }
  },
};

module.exports = ScuntTeamController;
