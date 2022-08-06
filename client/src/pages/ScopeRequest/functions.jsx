import useAxios from '../../hooks/useAxios.jsx';
const { axios } = useAxios();
import { fields, terms } from '../Registration/RegistrationFields';

export const getTotalScopes = () => {
  return {
    faq: ['delete', 'edit'],
    announcements: ['create', 'edit', 'delete'],
    accounts: ['read', 'edit', 'delete'],
    timeline: ['create', 'edit', 'delete'],
    signInFrosh: ['qr-code registration'],
    scunt: [
      'judge missions',
      'judge bribe points',
      'exec refill bribe points',
      'exec negative points',
      'exec allow missions page',
      'exec hide missions page',
      'exec show wedding missions',
      'exec hide wedding missions',
      'exec allow leaderboard',
      'exec hide leaderboard',
    ],
  };
};

export const getTotalRegistrationScopes = () => {
  let output = ['isRegistered', 'froshGroup', 'froshGroupIcon'];
  for (let key of Object.keys(fields)) {
    if (fields[key].type === 'label') {
      continue;
    }
    output = [...output, ...Object.keys(fields[key])];
  }
  return output;
};

export const submitScopes = (scopes, registrationScopes) => {
  console.log(scopes);
  console.log(registrationScopes);
  return true; //return a string if error
};
