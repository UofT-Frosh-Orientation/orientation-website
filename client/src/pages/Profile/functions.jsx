import {
  data,
  dataAlpha,
  dataBeta,
  dataChi,
  dataDelta,
  dataGamma,
  dataIota,
  dataKappa,
  dataLambda,
  dataNu,
  dataOmega,
  dataOmicron,
  dataPhi,
  dataPi,
  dataPsi,
  dataRho,
  dataSigma,
  dataTau,
  dataTheta,
  dataUpsilon,
  dataZeta,
} from '../../assets/schedule/data';
import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

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

export function getDaysSchedule(scheduleData) {
  const days = [];
  for (let day of Object.keys(scheduleData)) {
    days.push(day.split(' ')[0]);
  }
  return days;
}

export function getFroshGroupSchedule(froshGroup) {
  if (froshGroup === 'Alpha') {
    return dataAlpha;
  } else if (froshGroup === 'Beta') {
    return dataBeta;
  } else if (froshGroup === 'Iota') {
    return dataIota;
  } else if (froshGroup === 'Phi') {
    return dataPhi;
  } else if (froshGroup === 'Psi') {
    return dataPsi;
  } else if (froshGroup === 'Rho') {
    return dataRho;
  } else if (froshGroup === 'Zeta') {
    return dataZeta;
  } else if (froshGroup === 'Gamma') {
    return dataGamma;
  } else if (froshGroup === 'Omega') {
    return dataOmega;
  } else if (froshGroup === 'Chi') {
    return dataChi;
  } else if (froshGroup === 'Upsilon') {
    return dataUpsilon;
  } else if (froshGroup === 'Pi') {
    return dataPi;
  } else if (froshGroup === 'Nu') {
    return dataNu;
  } else if (froshGroup === 'Delta') {
    return dataDelta;
  } else if (froshGroup === 'Sigma') {
    return dataSigma;
  } else if (froshGroup === 'Tau') {
    return dataTau;
  } else if (froshGroup === 'Kappa') {
    return dataKappa;
  } else if (froshGroup === 'Theta') {
    return dataTheta;
  } else if (froshGroup === 'Lambda') {
    return dataLambda;
  } else if (froshGroup === 'Omicron') {
    return dataOmicron;
  } else {
    return data;
  }
}

export function qrKeys() {
  return [
    'email',
    'firstName',
    'lastName',
    'preferredName',
    'pronouns',
    'shirtSize',
    'froshGroup',
    'discipline',
  ];
}

export function parseQRCode(qrString) {
  try {
    let qrStringSplit = qrString.split('|');
    return {
      email: qrStringSplit[0],
      firstName: qrStringSplit[1],
      lastName: qrStringSplit[2],
      preferredName: qrStringSplit[3],
      pronouns: qrStringSplit[4],
      shirtSize: qrStringSplit[5],
      froshGroup: qrStringSplit[6],
      discipline: qrStringSplit[7],
    };
  } catch (e) {
    return {
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      preferredName: undefined,
      pronouns: undefined,
      shirtSize: undefined,
      froshGroup: undefined,
      discipline: undefined,
    };
  }
}

export function getQRCodeString(user) {
  // Keep in this order:
  // email | full name or preferred name | pronouns | shirt size | frosh group | discipline
  try {
    let allDetails = user.email;
    return allDetails.concat(
      '|',
      user.firstName,
      '|',
      user.lastName,
      '|',
      user.preferredName,
      '|',
      user.pronouns,
      '|',
      user.shirtSize,
      '|',
      user.froshGroup,
      '|',
      user.discipline,
    );
  } catch (error) {
    console.log(error);
  }
}

//Return true if successful
//Return an error string if not
export async function signInFrosh(email) {
  try {
    const date = new Date();
    await axios.put('/qr/scan', {
      email: email,
      date: date.toISOString(),
      tzOffset: date.getTimezoneOffset(),
    });

    return true;
  } catch (error) {
    return error;
  }
}

export async function searchForFrosh(email) {
  try {
    const response = await axios.get('/qr/search', {
      params: {
        search: email,
      },
    });

    return response.data.QrInfo;
  } catch (error) {
    return error;
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function getFroshData() {
  try {
    const response = await axios.get('/user/info');
    const { user } = response.data;
    return {
      froshGroupIcon: 'λ',
      froshGroup: user.froshGroup, //TODO: add non-static icons that changes depending on froshGroup
      firstName: user.firstName,
      lastName: user.lastName,
      discipline: user.discipline,
      email: user.email,
    };
  } catch (error) {
    console.log(error);
  }
}
