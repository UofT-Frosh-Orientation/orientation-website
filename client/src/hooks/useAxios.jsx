const axios = require('axios').default;

const useAxios = () => {
  const instance = axios.create({
    baseURL: process.env.API_BASE_URL,
    withCredentials: true,
  });
};
