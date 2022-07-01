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
  // console.log(signUpUser);
  // /*eslint no-undef: 0*/
  // let promise = new Promise((res, rej) => {
  //   setTimeout(() => res('An error occured!'), 1000);
  // });
  // let result = await promise;
  // return true; //return an error message string to be dispayed, if an error
  const data = {
    password: user.password,
    name: user.firstName + ' ' + user.lastName,
    email: user.email,
  };
  const response = fetch('http://localhost:5001/user/signup', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  response.then(
    (data) => {
      return true;
      // console.log(data);
      // process data.
    },
    (error) => {
      return error;
    },
  );
}
