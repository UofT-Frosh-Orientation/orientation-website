import useAxios from '../../hooks/useAxios.jsx';
const { axios } = useAxios();

export async function getSelectedFroshValues() {
  // This is sample data, the shirtSize cannot be modified, and the initial value is given, it is disabled in RegistrationFields.jsx
  // return {
  //   utorid: 'JamesKokoska',
  //   shirtSize: 3, //Rememeber indices must match those set in RegistrationFields.jsx
  //   discipline: 2,
  //   birthdate: '2000-01-01',
  //   pronoun: 0,
  // };

  try {
    const response = await axios.get('/user/info');
    console.log(response);
    return response.data.user;
  } catch (error) {
    console.log(error);
  }
}

export function submitEdits(froshObject) {
  const result = axios({
    method: 'put',
    url: '/frosh/updateInfo',
    data: froshObject,
  })
    .then(function (response) {
      if (response.status == 200) {
        return true;
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
}
