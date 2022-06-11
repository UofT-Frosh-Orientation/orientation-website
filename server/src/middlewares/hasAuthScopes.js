/**
 *
 * @param {Array<String>} scopes
 * @return {(function(*, *, *))|*}
 */
const hasAuthScopes = (scopes) => {
  return (req, res, next) => {
    const {authScopes} = req.user;
    let unauthorized = false;
    if (authScopes.find(authScope => authScope.scope === "admin" && authScope.approved.includes("all"))) {
      return next();
    }
    scopes.forEach(s => {
      const [scope, type] = s.split(':')
      if (!authScopes.find(authScope => (authScope.scope === scope && (authScope.approved.includes('all') || authScope.approved.includes(type))))) {
        unauthorized = true;
      }
    });
    return unauthorized ? res.status(403).send({message: "You are not authorized to access this resource"}) : next()
  }
}

module.exports = hasAuthScopes;
