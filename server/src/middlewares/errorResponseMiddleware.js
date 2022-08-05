function errorResponseMiddleware(err, req, res, next) {
  let statusCode, errorMessage;

  if (err.message === 'DUPLICATE_EMAIL') {
    statusCode = 400;
    errorMessage = 'This email address has already been used to create an account.';
  } else if (err.errors) {
    // TODO: finish error handling when implementing proper backend validation
    statusCode = 400;
    errorMessage = 'Please provide your full name.';
  } else if (err.message === 'INVALID_EMAIL') {
    statusCode = 400;
    errorMessage = 'Please submit a valid email address.';
  } else if (err.message === 'INVALID_PASSWORD') {
    statusCode = 400;
    errorMessage = 'Please submit a valid password.';
  } else if (err.message === 'UNAUTHORIZED') {
    statusCode = 403;
    errorMessage = 'Unauthorized';
  } else {
    statusCode = 500;
    errorMessage = 'whoops we have no idea what happened!?';
  }
  //... for more error messages ...

  res.status(statusCode).send(errorMessage);
}

module.exports = errorResponseMiddleware;
