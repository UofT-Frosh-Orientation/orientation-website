function errorResponseMiddleware(err, req, res, next) {
  let statusCode, errorMessage;

  if (err.message === 'INVALID_EMAIL') {
    statusCode = 400;
    errorMessage = 'Please provide a valid email!';
  } else if (err.message === 'UNAUTHORIZED') {
    statusCode = 401;
    errorMessage = 'Unauthorized';
  }
  //... for more error messages ...

  res.status(statusCode).send(errorMessage);
}
