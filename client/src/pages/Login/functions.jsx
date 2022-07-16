import useAxios from '../../hooks/useAxios';

const { axios } = useAxios();

export async function login(email, password) {
  try {
    const result = await axios.post('/user/login', { email, password });
    return { data: result.data, error: null };
  } catch (err) {
    console.log(err);
    return {
      data: err,
      error:
        err.response.data.message ??
        'Something went wrong, please ensure that your username and password are correct.',
    };
  }
}

// function checks if email is valid and sends a reset password email
export async function resetPassword(email) {
  console.log(email);
  let promise = new Promise((res, rej) => {
    setTimeout(() => res(''), 1000);
    // currently does not display this ^ response as the display for error message,

    // uses the result to check what response to display
    // false -> "We didn't recognize that email, please try again!"
    // true  -> "Success, an email has been sent!"
  });
  let result = await promise;
  return true;
}
