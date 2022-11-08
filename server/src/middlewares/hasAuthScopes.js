/**
 * Checks whether the current user has the required auth scopes to access the route.
 * @param {Array<String>} scopes - An array of strings formatted as "scope:permission"
 * @return {(function(Object, Object, Function))|*} - A middleware which sends a 403 error if the user does not have the correct scope
 */
const hasAuthScopes = (scopes) => {
  return (req, res, next) => {
    const { authScopes } = req.user;
    let unauthorized = authScopes.approved.length === 0;
    if (authScopes.approved.includes('admin:all')) {
      return next();
    }
    scopes.forEach((s) => {
      if (!authScopes.approved.includes(s)) {
        unauthorized = true;
      }
    });
    // console.log(unauthorized);
    return unauthorized
      ? res.status(403).send({ message: 'You are not authorized to access this resource' })
      : next();
  };
};

module.exports = hasAuthScopes;
