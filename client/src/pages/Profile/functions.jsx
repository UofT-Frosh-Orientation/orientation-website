import { data } from '../../assets/schedule/data';

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

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
