/**
 * Checks whether the current user has the required auth scopes to access the route.
 * @param {Array<String>} scopes - An array of strings formatted as "scope:permission"
 * @return {(function(Request, Response, NextFunction))|*} - A middleware which sends a 403 error if the user does not have the correct scope
 */
const hasAuthScopes = (scopes) => {
  return (req, res, next) => {
    const {authScopes} = req.user;
    let unauthorized = authScopes.length === 0;
    if (authScopes.find(authScope => authScope.scope === "admin" && authScope.approved.includes("all"))) {
      return next();
    }
    scopes.forEach(s => {
      const [scope, permission] = s.split(':')
      if (!authScopes.find(authScope => (authScope.scope === scope && (authScope.approved.includes('all') || authScope.approved.includes(permission))))) {
        unauthorized = true;
      }
    });
    return unauthorized ? res.status(403).send({message: "You are not authorized to access this resource"}) : next()
  }
}

module.exports = hasAuthScopes;
