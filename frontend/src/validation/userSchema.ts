import * as yup from 'yup';

export const userInfoSchema = yup.object().shape({
  profilePhoto: yup.string().required('Profile photo is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dob: yup.date().required('Date of birth is required'),
  occupation: yup.string().required('Occupation is required'),
  gender: yup.string().oneOf(['Male', 'Female', 'Other']).required('Gender is required'),
});

export const userContactSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  fax: yup.string().nullable(),
  linkedInUrl: yup.string().url('Invalid URL').nullable(),
});

export const userAddressSchema = yup.object().shape({
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  zipCode: yup.string().required('ZIP Code is required'),
});

export const userAcademicsSchema = yup.object().shape({
  schools: yup.array().of(yup.string().required('School name is required')).min(1, 'At least one school is required'),
});
