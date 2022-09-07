const UserServices = require('../services/UserServices');
const ScuntGameSettingsServices = require('../services/ScuntGameSettingsServices');
const ScuntTeamServices = require('../services/ScuntTeamServices');
const ScuntMissionServices = require('../services/ScuntMissionServices');

const ScuntController = {
  /**
   * Logs in a Scunt by email and password
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async login(req, res, next) {
    try {
      const { email, code } = req.body;

      const existingUser = await UserServices.getUserByEmail(email);

      try {
        if (!existingUser.scuntToken || existingUser.scuntToken !== code) {
          return next(new Error('INVALID_SCUNT_CODE'));
        } else if (existingUser.isScuntDiscordLoggedIn === true) {
          return next(new Error('USER_ALREADY_SIGNED_INTO_SCUNT_DISCORD'));
        }
        const updateScuntLogin = { isScuntDiscordLoggedIn: true };
        await UserServices.updateUserInfo(existingUser.id, updateScuntLogin);
      } catch (err) {
        next(err);
      }

      const userInfo = {
        name: existingUser.firstName,
        teamNumber: existingUser.teamNumber, // existingUser.teamNumber
        pronouns: existingUser.pronouns,
        type: 'type',
      };

      return res.status(200).send({ message: userInfo });
    } catch (err) {
      next(err);
    }
  },

  async getMissionStatus(req, res, next) {
    try {
      const { missionNumber, teamNumber } = req.query;
      const gameSettings = await ScuntGameSettingsServices.getGameSettings();
      if (!gameSettings[0].revealMissions) {
        return next(new Error('MISSIONS_NOT_REVEALED'));
      }
      const mission = await ScuntMissionServices.getMission(missionNumber);
      const earnedPoints = await ScuntTeamServices.checkTransaction(
        parseInt(teamNumber),
        parseInt(missionNumber),
      );
      return res.status(200).send({
        name: mission?.name ?? '',
        category: mission?.category ?? '',
        missionStatus:
          earnedPoints < mission?.points
            ? 'You have not yet gained full points for this mission'
            : earnedPoints === mission?.points
            ? 'You gained full points for this mission'
            : 'You earned more than full points for this mission!',
        points: earnedPoints,
      });
    } catch (e) {
      next(e);
    }
  },

  async getLeaderboard(req, res, next) {
    try {
      const teams = await ScuntTeamServices.getTeamPoints();
      const teamScores = await teams.sort((a, b) => b.number - a.number).map((t) => t.points);
      res.status(200).send({ teamScores });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = ScuntController;
