/**
 * Applies a middleware if the condition evaluates to true.
 * @param {Boolean} condition - the condition to check
 * @param {Function} middleware = the middleware to apply
 * @returns {(function(*, *, *): void)|*}
 */
const conditionallyApply = (condition, middleware) => {
  if (condition) {
    return middleware;
  } else {
    return (req, res, next) => {
      next();
    };
  }
};

module.exports = conditionallyApply;
