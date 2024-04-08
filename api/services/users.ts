import {User} from '../../shared/types';
import axios from '../axios';

export const getUsers = async () => {
  try {
    const response = await axios.get('/users');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId: number) => {
  try {
    const response = await axios.get(`/users/${userId}`);
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

export const updateUser = async (user: User) => {
  try {
    const response = await axios.put(`/users/${user.id}`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
  try {
    const response = await axios.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
