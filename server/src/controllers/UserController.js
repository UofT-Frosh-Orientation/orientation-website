const UserServices = require('../services/UserServices');
const passport = require('../services/passport');

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

  /**
   * Logs in a user by email and password
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
  async login(req, res, next) {
    passport.authenticate('local', (err, user) => {
      if (err || !user) {
        res.status(403).send({ message: 'Please ensure your email and password are correct.' });
      } else {
        req.logIn(user, (err) => {
          if (err) {
            next(err);
          } else {
            res.status(200).send({ message: 'Success!', user: user.getResponseObject() });
          }
        });
      }
    })(req, res, next);
  },

  /**
   * Logs out the currently authenticated user.
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @return {Promise<void>}
   */
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
