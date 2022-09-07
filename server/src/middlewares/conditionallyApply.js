/**
 * Applies a middleware if the condition evaluates to true.
 * @param {Function} conditionalCallback - A function which returns whether to apply the middleware
 * @param {Function} middleware = the middleware to apply
 * @returns {(function(*, *, *): void)|*}
 */
const conditionallyApply = (conditionalCallback, middleware) => {
  return (req, res, next) => {
    const condition = conditionalCallback(req, res, next);
    if (condition) {
      return middleware(req, res, next);
    } else {
      next();
    }
  };
};

module.exports = conditionallyApply;
