const UserServices = require('../services/UserServices');

const UserController = {
  /**
   * Signs up a new user.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async signup(req, res, next) {
    try {

      const { email, password, firstName, lastName, preferredName } = req.body;
      
      
      await UserServices.validateUser(email.toLowerCase(), password, firstName, lastName);  
      
      
      const user = await UserServices.createUser(email.toLowerCase(), password, firstName, lastName, preferredName);

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).send({ message: 'Success!', user: user.getResponseObject() });
      });
    } catch (e) {
      next(e);
    }
  },
  /**
   * Gets the info of the currently authenticated user.
   * @param {Object} req
   * @param {Object} res
   * @return {Promise<void>}
   */
  async getInfo(req, res) {
    const user = req.user.getResponseObject();
    res.status(200).send({ user });
  },

  async logout(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      } else {
        return res.status(200).send({ message: 'Successfully logged out!' });
      }
    });
  },
};

module.exports = UserController;
