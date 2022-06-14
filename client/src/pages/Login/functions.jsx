export function login(username, password) {
  console.log(username, password);

  return 'Invalid Username or Password. Please try again!';
}

export function resetPassword(email) {
  console.log(email);

  // if valid email
  return 'Success! Check your email to reset your password';

  // if invalid email...
  // return ("Invalid Email Address!")
}
