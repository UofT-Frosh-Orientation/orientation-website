export async function login(username, password) {
  /*eslint no-undef: 0*/
  let promise = new Promise((res, rej) => {
    setTimeout(() => res('An error occurred. Please try again.'), 1000);
  });
  let result = await promise;
  return false; //return an error message string to be displayed, if an error
}

// export function resetPassword(email) {

//   // if valid email
//   return 'Success! Check your email!';

//   // if invalid email...
//   // return ("Invalid Email Address!")
// }

// function checks if email is valid and sends a reset password email
export async function resetPassword(email) {
  console.log(email);
  let promise = new Promise((res, rej) => {
    setTimeout(() => res(''), 1000);
    // "We didn't recognize that email, please try again!"
    // "Success! An email has been sent"
  });
  let result = await promise;
  return result; //return an error message string to be displayed, if an error
}
