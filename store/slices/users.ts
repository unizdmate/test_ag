import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {usersService} from '../../api/services';

type Geo = {
  lat: string;
  lng: string;
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

type UserState = {
  status: 'idle' | 'loading' | 'failed';
  users: User[];
};

const initialState: UserState = {
  status: 'loading',
  users: [],
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await usersService.getUsers();
    return response;
  } catch (error) {
    throw error;
  }
});

export const addNewUser = createAsyncThunk(
  'users/addNewUser',
  async (user: any) => {
    try {
      const response = await usersService.addUser(user);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.status = 'failed';
      })
      .addCase(addNewUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users.push(action.payload);
      })
      .addCase(addNewUser.rejected, state => {
        state.status = 'failed';
      });
  },
});

const {reducer} = usersSlice;
export {reducer as usersReducer};
