import * as Yup from 'yup';

const today = new Date();
today.setHours(0, 0, 0, 0);

export const bookSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .max(24, 'Too long')
    .matches(/^[A-Za-z\s]+$/, 'Only letters and spaces allowed')
    .required('Name is required'),

  email: Yup.string().email('Invalid email').required('Email is required'),

  date: Yup.date()
    .min(today, 'Date must be today or later')
    .required('Date is required'),

  comment: Yup.string().max(500, 'Too long').nullable(), // або .notRequired()
});
