import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
import {usersService} from '../../api/services';
import {User} from '../../shared/types';

type UserState = {
  status: 'idle' | 'loading' | 'failed';
  users: User[];
  user: User | null;
};

const initialState: UserState = {
  status: 'loading',
  users: [],
  user: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await usersService.getUsers();
    return response;
  } catch (error) {
    throw error;
  }
});

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: number) => {
    try {
      const response = await usersService.getUserById(userId);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const addNewUser = createAsyncThunk(
  'users/addNewUser',
  async (user: any) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await usersService.addUser(user); // Call the API but do not use response
      return user; // Ideally, the response should be returned here and it should contain the User object
    } catch (error) {
      throw error;
    }
  },
);

export const updateExistingUser = createAsyncThunk(
  'users/updateExistingUser',
  async (user: User) => {
    try {
      const response = await usersService.updateUser(user);
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteExistingUser = createAsyncThunk(
  'users/deleteExistingUser',
  async (userId: number) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await usersService.deleteUser(userId); // Call the API but do not use response
      return userId; // Ideally, the response should be returned here and it should contain the id of the deleted user
    } catch (error) {
      throw error;
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUserState: state => {
      state.status = 'idle';
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users.unshift(action.payload);
      })
      .addCase(updateExistingUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = state.users.map(user =>
          user.id === action.payload.id ? action.payload : user,
        );
      })
      .addCase(deleteExistingUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addMatcher(
        isAnyOf(
          fetchUsers.pending,
          fetchUserById.pending,
          addNewUser.pending,
          updateExistingUser.pending,
          deleteExistingUser.pending,
        ),
        state => {
          state.status = 'loading';
        },
      )
      .addMatcher(
        isAnyOf(
          fetchUsers.rejected,
          fetchUserById.rejected,
          addNewUser.rejected,
          updateExistingUser.rejected,
          deleteExistingUser.rejected,
        ),
        state => {
          state.status = 'failed';
        },
      );
  },
});

const {actions, reducer} = usersSlice;
export const {resetUserState} = actions;
export {reducer as usersReducer};
