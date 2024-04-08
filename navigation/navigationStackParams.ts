import {User} from '../shared/types';

export type HomeStackParamList = {
  Home: undefined;
};

export type UserAdministrationStackParamList = {
  UsersList: undefined;
  UserDetails: {user: User};
};
