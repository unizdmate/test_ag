import {number, object, string} from 'yup';

enum UserValidationMessages {
  REQUIRED = 'This field is required',
  MIN = 'This field must be at least 2 characters long',
  MAX = 'This field must be at most 50 characters long',
  EMAIL = 'Invalid email',
  URL = 'Invalid URL',
}

export const userValidationSchema = object().shape({
  id: number().required(),
  name: string()
    .required(UserValidationMessages.REQUIRED)
    .min(2, UserValidationMessages.MIN)
    .max(50, UserValidationMessages.MAX),
  username: string()
    .required(UserValidationMessages.REQUIRED)
    .min(2, UserValidationMessages.MIN)
    .max(50, UserValidationMessages.MAX),
  email: string()
    .required(UserValidationMessages.REQUIRED)
    .email(UserValidationMessages.EMAIL),
  address: object().shape({
    street: string()
      .required(UserValidationMessages.REQUIRED)
      .min(2, UserValidationMessages.MIN)
      .max(50, UserValidationMessages.MAX),
    city: string()
      .required(UserValidationMessages.REQUIRED)
      .min(2, UserValidationMessages.MIN)
      .max(50, UserValidationMessages.MAX),
    suite: string()
      .required(UserValidationMessages.REQUIRED)
      .min(2, UserValidationMessages.MIN)
      .max(50, UserValidationMessages.MAX),
    zipcode: string()
      .required(UserValidationMessages.REQUIRED)
      .min(2, UserValidationMessages.MIN)
      .max(50, UserValidationMessages.MAX),
    geo: object().shape({
      lat: string().required(UserValidationMessages.REQUIRED),
      lng: string().required(UserValidationMessages.REQUIRED),
    }),
  }),
  phone: string()
    .required(UserValidationMessages.REQUIRED)
    .min(2, UserValidationMessages.MIN)
    .max(50, UserValidationMessages.MAX),
  website: string()
    .required(UserValidationMessages.REQUIRED)
    .matches(
      /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
      UserValidationMessages.URL,
    ),
  company: object().shape({
    name: string()
      .required(UserValidationMessages.REQUIRED)
      .min(2, UserValidationMessages.MIN)
      .max(50, UserValidationMessages.MAX),
    catchPhrase: string()
      .required(UserValidationMessages.REQUIRED)
      .min(2, UserValidationMessages.MIN)
      .max(50, UserValidationMessages.MAX),
    bs: string().required(UserValidationMessages.REQUIRED),
  }),
});
