const UserServices = require('../services/UserServices');

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
        if (!existingUser.scuntToken || existingUser.scuntToken != code) {
          return next(new Error('INVALID_SCUNT_CODE'));
        } else if (existingUser.isScuntDiscordLoggedIn == true) {
          return next(new Error('USER_ALREADY_SIGNED_INTO_SCUNT_DISCORD'));
        }
        const updateScuntLogin = { isScuntDiscordLoggedIn: true };
        await UserServices.updateUserInfo(existingUser.id, updateScuntLogin);
      } catch (err) {
        next(err);
      }

      const userInfo = {
        name: existingUser.firstName,
        teamNumber: undefined, // existingUser.teamNumber
        pronouns: existingUser.pronouns,
        type: 'type',
      };

      return res.status(200).send({ message: userInfo });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ScuntController;
