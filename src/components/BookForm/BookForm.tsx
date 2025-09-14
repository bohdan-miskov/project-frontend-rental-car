import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from './BookForm.module.css';
import { useSelector } from 'react-redux';
import {
  selectOperationError,
  selectOperationLoading,
} from '../../redux/cars/selectors';
import { useAppDispatch } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { bookCar } from '../../redux/cars/operation';
import clsx from 'clsx';
import * as zod from 'zod';
import { useState } from 'react';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import SuccessToastMessage from '../SuccessToastMessage/SuccessToastMessage';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';

export default function BookForm({ id }: { id: string | undefined }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<null | string>(null);
  const isLoading = useSelector(selectOperationLoading);
  const error = useSelector(selectOperationError);

  const today = new Date();

  const bookSchema = zod.object({
    name: zod
      .string()
      .min(2, { message: 'Too short' })
      .max(24, { message: 'Too long' })
      .trim()
      .regex(/^[A-Za-z\s]+$/, { message: 'Only letters and spaces allowed' }),

    email: zod.email({ message: 'Invalid email' }).trim(),

    date: zod
      .preprocess(
        val => (typeof val === 'string' ? new Date(val) : val),
        zod.date()
      )
      .refine(d => d >= today, { message: 'Date must be today or later' }),

    comment: zod.string().max(500, { message: 'Too long' }).trim().optional(),
  });

  type Values = {
    name: string;
    email: string;
    date: Date;
    comment?: string;
  };

  const initialValues = {
    name: '',
    email: '',
    date: new Date(),
    comment: '',
  };

  const handleSubmit = async (values: Values) => {
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      bookingDate: values.date,
      comment: values.comment?.trim(),
    };

    setSuccessMessage(null);
    await dispatch(bookCar({ payload, id: id ?? '' })).unwrap();
    setSuccessMessage('Success booking!');
    navigate('/catalog');
  };

  return (
    <>
      <div className={styles.bookContainer}>
        <h2 className={styles.bookTitle}>Book your car now</h2>
        <p className={styles.bookText}>
          Stay connected! We are always ready to help you.
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={bookSchema}
        >
          <Form className={styles.bookForm}>
            <Field
              className={styles.formField}
              placeholder="Name*"
              name="name"
              type="text"
            />
            <ErrorMessage
              className={styles.formError}
              name="name"
              component="div"
            />
            <Field
              className={styles.formField}
              placeholder="Email*"
              name="email"
              type="email"
            />
            <ErrorMessage
              className={styles.formError}
              name="email"
              component="div"
            />
            <Field
              className={styles.formField}
              placeholder="Booking date"
              name="date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
            />
            <ErrorMessage
              className={styles.formError}
              name="date"
              component="div"
            />
            <Field
              className={styles.formField}
              placeholder="Comment"
              name="comment"
              type="text"
            />
            <ErrorMessage
              className={styles.formError}
              name="comment"
              component="div"
            />
            <button type="submit" className={clsx(styles.formBtn, 'blue-btn')}>
              Send
            </button>
          </Form>
        </Formik>
      </div>
      {isLoading && <FullScreenLoader text="Booking..." />}
      {error && <ErrorToastMessage>{error.message}</ErrorToastMessage>}
      {successMessage && (
        <SuccessToastMessage>{successMessage}</SuccessToastMessage>
      )}
    </>
  );
}
