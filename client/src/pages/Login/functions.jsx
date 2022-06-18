export async function login(username, password) {
  console.log(username, password);
  /*eslint no-undef: 0*/
  let promise = new Promise((res, rej) => {
    setTimeout(() => res('An error occured. Please try again.'), 1000);
  });
  let result = await promise;
  return result; //return an error message string to be dispayed, if an error
}

export function resetPassword(email) {
  console.log(email);

  // if valid email
  return 'Success! Check your email!';

  // if invalid email...
  // return ("Invalid Email Address!")
}
