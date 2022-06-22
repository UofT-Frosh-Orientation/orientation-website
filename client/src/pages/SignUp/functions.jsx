export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export function validatePassword(password) {
  const strongPasswordRegex = RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
  return String(password).match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
}

export function validatePasswordLength(password) {
  if (password.length >= 35) return false;
  return true;
}

export async function signUpUser(user) {
  console.log(signUpUser);
  /*eslint no-undef: 0*/
  let promise = new Promise((res, rej) => {
    setTimeout(() => res('An error occured!'), 1000);
  });
  let result = await promise;
  return true; //return an error message string to be dispayed, if an error
}
