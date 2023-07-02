import axios from 'axios';

const useAxios = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:5001/',
    withCredentials: true,
  });
  return { axios: instance };
};

export default useAxios;
