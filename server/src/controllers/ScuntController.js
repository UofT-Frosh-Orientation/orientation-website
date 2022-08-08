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
      const userId = req.user.id;

      try {
        const existingUser = await UserServices.getUserByEmail(email);

        if (!existingUser.scuntToken || existingUser.scuntToken != code) {
          return res.status(400).send({ message: 'INVALID_CODE' });
        }
      } catch (err) {
        res.status(400).send({ message: 'INVALID_EMAIL' });
        next(err);
      }

      const updateScuntLogin = { isLoggedInOnDiscord: true };
      await UserServices.updateUserInfo(userId, updateScuntLogin);

      // const scuntTeam = existingUser.scuntTeam
      const scuntTeam = 'undefined';

      return res.status(200).send({ message: scuntTeam });
    } catch (err) {
      console.log('Error in scunt login', err);
      next(err);
    }
  },
};

module.exports = ScuntController;
