/**
 * Checks whether the user is signed in.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {*}
 */
const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(403).send({ message: 'Please sign in to access this route!' });
  }
};

module.exports = checkLoggedIn;
