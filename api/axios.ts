import axios from 'axios';

// This module provides a simplified example of creating an Axios instance for making HTTP requests.
// In a production application, this setup would likely include additional configuration and interceptors
// to handle aspects such as error management and authentication. However, as the JSONPlaceholder API
// used in this example does not require these features, the configuration here is kept minimal for clarity.

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const createAxiosInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
    timeout: 120000, // 2 minutes
  });
};

const instance = createAxiosInstance();

export default instance;
