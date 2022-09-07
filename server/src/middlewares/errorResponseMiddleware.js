function errorResponseMiddleware(err, req, res, next) {
  let statusCode, errorMessage;
  console.log('errorMiddleware');
  console.log(err);

  if (err.message === 'DUPLICATE_EMAIL') {
    statusCode = 400;
    errorMessage = 'This email address has already been used to create an account.';
  } else if (err.errors) {
    console.log(err);
    // TODO: finish error handling when implementing proper backend validation
    statusCode = 400;
    errorMessage = 'Please provide your full name.';
  } else if (err.message === 'INVALID_EMAIL') {
    statusCode = 400;
    errorMessage = 'Please submit a valid email address.';
  } else if (err.message === 'INVALID_PASSWORD') {
    statusCode = 400;
    errorMessage = 'Please submit a valid password.';
  } else if (err.message === 'USER_ALREADY_SIGNED_INTO_SCUNT_DISCORD') {
    statusCode = 400;
    errorMessage = 'User has already signed into discord for scunt.';
  } else if (err.message === 'INVALID_SCUNT_CODE') {
    statusCode = 400;
    errorMessage = 'Incorrect Scunt Token.';
  } else if (err.message === 'UNABLE_TO_UPDATE_USER') {
    statusCode = 400;
    errorMessage = 'Error in updating user.';
  } else if (err.message === 'UNAUTHORIZED') {
    statusCode = 403;
    errorMessage = 'Unauthorized';
  } else {
    statusCode = 500;
    errorMessage = 'whoops we have no idea what happened!?';
  }
  //... for more error messages ...

  res.status(statusCode).send({ errorMessage });
}

module.exports = errorResponseMiddleware;
