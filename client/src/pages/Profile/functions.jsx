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
  return data; // for now, return the default schedule
  // if (froshGroup === 'Alpha') {
  //   return dataAlpha;
  // } else if (froshGroup === 'Beta') {
  //   return dataBeta;
  // } else if (froshGroup === 'Iota') {
  //   return dataIota;
  // } else if (froshGroup === 'Phi') {
  //   return dataPhi;
  // } else if (froshGroup === 'Psi') {
  //   return dataPsi;
  // } else if (froshGroup === 'Rho') {
  //   return dataRho;
  // } else if (froshGroup === 'Zeta') {
  //   return dataZeta;
  // } else if (froshGroup === 'Gamma') {
  //   return dataGamma;
  // } else if (froshGroup === 'Omega') {
  //   return dataOmega;
  // } else if (froshGroup === 'Chi') {
  //   return dataChi;
  // } else if (froshGroup === 'Upsilon') {
  //   return dataUpsilon;
  // } else if (froshGroup === 'Pi') {
  //   return dataPi;
  // } else if (froshGroup === 'Nu') {
  //   return dataNu;
  // } else if (froshGroup === 'Delta') {
  //   return dataDelta;
  // } else if (froshGroup === 'Sigma') {
  //   return dataSigma;
  // } else if (froshGroup === 'Tau') {
  //   return dataTau;
  // } else if (froshGroup === 'Kappa') {
  //   return dataKappa;
  // } else if (froshGroup === 'Theta') {
  //   return dataTheta;
  // } else if (froshGroup === 'Lambda') {
  //   return dataLambda;
  // } else if (froshGroup === 'Omicron') {
  //   return dataOmicron;
  // } else {
  //   return data;
  // }
}

export function scannedUserKeys() {
  return ['email', 'pronouns', 'discipline', 'froshGroup', 'photograph', 'shirtSize'];
}

export function parseQRCode(qrString) {
  console.log('qrString', qrString);
  try {
    return { id: qrString };
  } catch (error) {
    console.error('error parsing QR code', error);
  }
}

export function getQRCodeString(user) {
  try {
    return user?.id;
  } catch (error) {
    console.error('error getting QR code string', error);
  }
}

//Return true if successful
//Return an error string if not
export async function signInFrosh(userID) {
  try {
    const date = new Date();
    const result = await axios.put('/qr/scan', {
      userID: userID,
      date: date.toISOString(),
      tzOffset: date.getTimezoneOffset(),
    });

    return result;
  } catch (error) {
    console.error('error signing frosh', error);
    return error;
  }
}

export async function searchForFrosh(userID) {
  try {
    const response = await axios.get('/qr/search', {
      params: {
        search: userID,
      },
    });

    return response.data.QrInfo;
  } catch (error) {
    console.error('error searching for frosh', error);
    return error;
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
