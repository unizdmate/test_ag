import {StackNavigationProp} from '@react-navigation/stack';
import {UserAdministrationStackParamList} from '../../../navigation/navigationStackParams';
import {User} from '../../../shared/types';

export type NavigationParamList = {
  params: {
    user: User;
  };
};

export type UserDetailsNavigationProp = StackNavigationProp<
  UserAdministrationStackParamList,
  'UserDetails'
>;

export enum Labels {
  OK = 'OK',
  CANCEL = 'Cancel',
  NAME = 'Name',
  USERNAME = 'Username',
  EMAIL = 'Email',
  STREET = 'Street',
  CITY = 'City',
  PHONE = 'Phone',
  WEBSITE = 'Website',
  COMPANY_NAME = 'Company Name',
  CATCH_PHRASE = 'Company Catch Phrase',
  EDIT = 'Edit',
  DELETE = 'Delete',
  DISCARD = 'Discard',
  SAVE = 'Save',
  GO_BACK = 'Go back',
  DISCLAIMER = 'Disclaimer:',
  HIDE = 'Hide',
  WARNING_DELETE = 'Warning: Delete User',
}

export enum Messages {
  EDIT_SUCCESS = 'User data edited successfully.',
  DELETE_SUCCESS = 'User deleted successfully.',
  ERROR = 'Oops! Something went wrong. Please try again.',
}

export enum Disclaimers {
  EDIT_DISCLAIMER = `This section is purely demonstrative, illustrating the data that would be submitted if we were interfacing with a live API.
  
Given our use of the JsonPlaceholder API, actual data updates are not possible.
    
Regardless of the data transmitted, the API will consistently return a status of 201.
    
We can only persist the data locally in Redux store for the duration of the session.`,

  DELETE_DISCLAIMER = `This action is purely demonstrative, illustrating the deletion of a user based on their unique identifier.
  
Given our use of the JsonPlaceholder API, actual deletion is not possible and the API will consistently return a status of 200.
  
We can only persist deletion of user locally in Redux store for the duration of the session.`,
}
