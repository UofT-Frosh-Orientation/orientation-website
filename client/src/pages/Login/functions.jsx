export async function login(username, password) {
  /*eslint no-undef: 0*/
  console.log(username, password);
  let promise = new Promise((res, rej) => {
    setTimeout(() => res('An error occurred. Please try again.'), 1000);
  });

  let result = await promise;
  return result; //return an error message string to be displayed, if an error
}

// function checks if email is valid and sends a reset password email
export async function resetPassword(email) {
  console.log(email);
  let promise = new Promise((res, rej) => {
    setTimeout(() => res(''), 1000);
    // currently does not display this ^ response,

    // uses the result to check what response to display
    // false -> "We didn't recognize that email, please try again!"
    // true  -> "Success, an email has been sent!"
  });
  let result = await promise;
  return false;
}
