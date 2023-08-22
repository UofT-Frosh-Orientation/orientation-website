function errorResponseMiddleware(error, req, res, next) {
  let statusCode, errorMessage;
  console.log('errorMiddleware: ');
  console.error(error);

  if (error.message === 'DUPLICATE_EMAIL') {
    statusCode = 400;
    errorMessage = 'This email address has already been used to create an account.';
  } else if (error.errors) {
    // TODO: finish error handling when implementing proper backend validation
    statusCode = 400;
    errorMessage = 'Please provide your full name.';
  } else if (error.message === 'INVALID_EMAIL') {
    statusCode = 400;
    errorMessage = 'Please submit a valid email address.';
  } else if (error.message === 'INVALID_PASSWORD') {
    statusCode = 400;
    errorMessage = 'Please submit a valid password.';
  } else if (error.message === 'USER_ALREADY_SIGNED_INTO_SCUNT_DISCORD') {
    statusCode = 400;
    errorMessage = 'User has already signed into discord for scunt.';
  } else if (error.message === 'INVALID_SCUNT_CODE') {
    statusCode = 400;
    errorMessage = 'Incorrect Scunt Token.';
  } else if (error.message === 'UNABLE_TO_UPDATE_USER') {
    statusCode = 400;
    errorMessage = 'Error in updating user.';
  } else if (error.message === 'UNAUTHORIZED') {
    statusCode = 403;
    errorMessage = 'Unauthorized';
  } else if (error.message === 'TEAMS_NOT_FOUND') {
    statusCode = 404;
    errorMessage = 'No scunt teams found. Initialize teams to create them.';
  } else {
    statusCode = 500;
    errorMessage = 'whoops we have no idea what happened!?';
  }
  //... for more error messages ...

  res.status(statusCode).send({ errorMessage, code: error.message });
}

module.exports = errorResponseMiddleware;
