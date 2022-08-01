import useAxios from '../../hooks/useAxios.jsx';
const { axios } = useAxios();
import { fields, terms } from '../Registration/RegistrationFields';

export const getTotalScopes = () => {
  return { faq: ['read', 'edit'], announcements: ['read', 'edit'], signInFrosh: [true] };
};

export const getTotalRegistrationScopes = () => {
  let output = [];
  for (let key of Object.keys(fields)) {
    output = [...output, ...Object.keys(fields[key])];
  }
  return output;
};

export const submitScopes = (scopes, registrationScopes) => {
  console.log(scopes);
  console.log(registrationScopes);
  return true; //return a string if error
};
