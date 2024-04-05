import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const createAxiosInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
    timeout: 120000, // 2 minutes
  });
};

const instance = createAxiosInstance();

export default instance;
