import {User} from '../shared/types';

// The HomeStackParamList type defines the list of screens within the Home navigation stack.
// Currently, for the sake of this test application, it only contains the Home screen, which does not require any parameters.
export type HomeStackParamList = {
  Home: undefined;
};

// The UserAdministrationStackParamList type defines the list of screens within the User Administration navigation stack.
// It contains the UsersList screen, which does not require any parameters, and the UserDetails screen, which requires a User object as a parameter.
export type UserAdministrationStackParamList = {
  UsersList: undefined;
  UserDetails: {user: User};
};

export type AddNewUserStackParamList = {
  AddNewUser: undefined;
};
