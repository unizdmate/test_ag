import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const createAxios = () => {
  return axios.create({
    baseURL: BASE_URL,
    timeout: 120000,
  });
};

const instance = createAxios();

export default instance;
