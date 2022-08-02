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
      const userId = req.user.id;

      if (existingUser && code == existingUser.scuntToken) {
        const updateScuntLogin = { isLoggedInOnDiscord: true };
        await UserServices.updateUserInfo(userId, updateScuntLogin);
      }

      // create API to return frosh group
      return res.status(200).send({ message: 'Successfully logged into scunt!' });
    } catch (err) {
      console.log('Error in password scunt login', err);
      next(err);
    }
  },
};

module.exports = ScuntController;
