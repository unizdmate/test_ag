import axios from '../axios';

export const getUsers = async () => {
  try {
    const response = await axios.get('/users');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (user: any) => {
  try {
    const response = await axios.post('/users', user);
    return response.data;
  } catch (error) {
    throw error;
  }
};
