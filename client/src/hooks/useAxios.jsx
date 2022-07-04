import axios from 'axios';

const useAxios = () => {
  // console.log(import.meta.env)
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  });
  return { axios: instance };
};

export default useAxios;
