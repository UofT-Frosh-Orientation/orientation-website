function errorResponseMiddleware(err, req, res, next) {
  let statusCode, errorMessage;
  console.log('errorMiddleware: ');
  console.error(err);

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
  } else if (err.message === 'SETTINGS_NOT_FOUND') {
    statusCode = 404;
    errorMessage = 'Settings not found. Initialize the settings first.';
  } else if (err.message === 'INVALID_SETTINGS') {
    statusCode = 400;
    errorMessage = "Invalid settings. The current settings don't allow you to do this.";
  } else if (err.message === 'NO_MISSIONS_FOUND') {
    statusCode = 404;
    errorMessage = 'No missions found. Add some missions first.';
  } else if (err.message === 'UNABLE_TO_CREATE_MISSION') {
    statusCode = 500;
    errorMessage = 'Unable to create mission. There was an error in creating the mission.';
  } else if (err.message === 'UNABLE_TO_CREATE_SCUNT_MISSIONS') {
    statusCode = 500;
    errorMessage = 'Unable to create missions. There was an error in creating the missions.';
  } else if (err.message === 'MISSION_NOT_FOUND') {
    statusCode = 404;
    errorMessage = 'Mission not found. Please check the mission number.';
  } else if (err.message === 'LEADUR_NOT_FOUND') {
    statusCode = 404;
    errorMessage = 'Leadur not found.';
  } else if (err.message === 'TEAMS_NOT_FOUND') {
    statusCode = 404;
    errorMessage = 'Teams not found. Please initialize the teams first.';
  } else if (err.message === 'NOT_ENOUGH_BRIBE_POINTS') {
    statusCode = 400;
    errorMessage = 'Not enough bribe points. Please ask an exec to give you more.';
  } else if (err.message === 'NOT_ALLOWED_TO_JUDGE') {
    statusCode = 400;
    errorMessage = 'You are not allowed to judge yet.';
  } else if (err.message === 'INVALID_TEAM_NUMBER') {
    statusCode = 400;
    errorMessage = 'Invalid team number.';
  } else if (err.message === 'JUDGES_NOT_FOUND') {
    statusCode = 404;
    errorMessage = 'Judges not found. Please add the judges first.';
  } else if (err.message === 'MISSING_SCUNT_SETTINGS') {
    statusCode = 404;
    errorMessage = 'Scunt settings are not valid. Please reinitialize them.';
  } else if (err.message === 'SCUNT_FROSH_NOT_FOUND') {
    statusCode = 404;
    errorMessage = 'Scunt frosh not found. Please add the scunt frosh first.';
  } else if (err.message === 'TEAM_NOT_FOUND') {
    statusCode = 404;
    errorMessage = 'Team not found. Please check the team number.';
  } else if (err.message === 'TRANSACTIONS_NOT_FOUND') {
    statusCode = 404;
    errorMessage = 'Transactions not found. Please add the transactions first.';
  } else if (err.message === 'USER_NOT_FOUND') {
    statusCode = 404;
    errorMessage = 'User not found.';
  } else if (err.message === 'USERS_NOT_FOUND') {
    statusCode = 404;
    errorMessage = 'Users not found.';
  } else if (err.message === 'UNABLE_TO_UPDATE_SCUNT_SETTINGS') {
    statusCode = 400;
    errorMessage = 'Unable to update scunt settings. Please input valid values.';
  } else if (err.message === 'FROSH_NOT_FOUND') {
    statusCode = 404;
    errorMessage = 'Frosh not found. They might not be registered.';
  } else {
    statusCode = 500;
    errorMessage = 'whoops we have no idea what happened!?';
  }
  //... for more error messages ...

  res.status(statusCode).send({ errorMessage });
}

module.exports = errorResponseMiddleware;
