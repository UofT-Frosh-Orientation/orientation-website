import useAxios from '../../hooks/useAxios.jsx';
import { froshGroups } from '../../util/frosh-groups.jsx';
const { axios } = useAxios();
import { fields, terms } from '../Registration/RegistrationFields';

export const getTotalScopes = () => {
  let froshGroupData = [];
  for (let froshGroup of froshGroups) {
    froshGroupData.push(froshGroup.name);
  }
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
    froshGroupData: ['all', ...froshGroupData],
    froshData: ['unRegisteredUsers'], // Can see leader accounts, frosh who haven't finished payment
  };
};

export const getTotalRegistrationScopes = () => {
  let output = ['froshGroup', 'froshGroupIcon'];
  for (let key of Object.keys(fields)) {
    if (fields[key].type === 'label') {
      continue;
    }
    output = [...output, ...Object.keys(fields[key])];
  }
  return output;
};
