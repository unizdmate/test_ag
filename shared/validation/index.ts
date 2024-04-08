import {number, object, string} from 'yup';

enum ValidationMessages {
  REQUIRED = 'This field is required',
  MIN = 'This field must be at least 2 characters long',
  MAX = 'This field must be at most 50 characters long',
  EMAIL = 'Invalid email',
  URL = 'Invalid URL',
}

export const validationSchema = object().shape({
  id: number().required(),
  name: string()
    .required(ValidationMessages.REQUIRED)
    .min(2, ValidationMessages.MIN)
    .max(50, ValidationMessages.MAX),
  username: string()
    .required(ValidationMessages.REQUIRED)
    .min(2, ValidationMessages.MIN)
    .max(50, ValidationMessages.MAX),
  email: string()
    .required(ValidationMessages.REQUIRED)
    .email(ValidationMessages.EMAIL),
  address: object().shape({
    street: string()
      .required(ValidationMessages.REQUIRED)
      .min(2, ValidationMessages.MIN)
      .max(50, ValidationMessages.MAX),
    city: string()
      .required(ValidationMessages.REQUIRED)
      .min(2, ValidationMessages.MIN)
      .max(50, ValidationMessages.MAX),
    suite: string()
      .required(ValidationMessages.REQUIRED)
      .min(2, ValidationMessages.MIN)
      .max(50, ValidationMessages.MAX),
    zipcode: string()
      .required(ValidationMessages.REQUIRED)
      .min(2, ValidationMessages.MIN)
      .max(50, ValidationMessages.MAX),
    geo: object().shape({
      lat: string().required(ValidationMessages.REQUIRED),
      lng: string().required(ValidationMessages.REQUIRED),
    }),
  }),
  phone: string()
    .required(ValidationMessages.REQUIRED)
    .min(2, ValidationMessages.MIN)
    .max(50, ValidationMessages.MAX),
  website: string()
    .required(ValidationMessages.REQUIRED)
    .matches(
      /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
      ValidationMessages.URL,
    ),
  company: object().shape({
    name: string()
      .required(ValidationMessages.REQUIRED)
      .min(2, ValidationMessages.MIN)
      .max(50, ValidationMessages.MAX),
    catchPhrase: string()
      .required(ValidationMessages.REQUIRED)
      .min(2, ValidationMessages.MIN)
      .max(50, ValidationMessages.MAX),
    bs: string().required(ValidationMessages.REQUIRED),
  }),
});
