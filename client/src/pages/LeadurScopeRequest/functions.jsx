import useAxios from '../../hooks/useAxios.jsx';
const { axios } = useAxios();
import { fields, terms } from '../Registration/RegistrationFields';

export const getTotalScopes = () => {
  return { faq: ['read', 'edit'], announcements: ['read', 'edit'], signInFrosh: [false, true] };
};

export const getTotalRegistrationScopes = () => {
  let output = [];
  for (let key of Object.keys(fields)) {
    output = [...output, ...Object.keys(fields[key])];
  }
  return output;
};

export const submitScopes = (scopes) => {
  console.log(scopes);
  return true; //return a string if error
};
