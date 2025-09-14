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

import { useState } from 'react';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import SuccessToastMessage from '../SuccessToastMessage/SuccessToastMessage';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import { bookSchema } from './BookForm.validation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookForm({ id }: { id: string | undefined }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<null | string>(null);
  const isLoading = useSelector(selectOperationLoading);
  const error = useSelector(selectOperationError);

  type Values = {
    name: string;
    email: string;
    date: Date | null;
    comment?: string;
  };

  const initialValues = {
    name: '',
    email: '',
    date: null,
    comment: '',
  };

  const handleSubmit = async (
    values: Values,
    { resetForm }: { resetForm: () => void }
  ) => {
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      bookingDate: values.date ?? new Date(),
      comment: values.comment?.trim(),
    };

    setSuccessMessage(null);
    await dispatch(bookCar({ payload, id: id ?? '' })).unwrap();
    setSuccessMessage('Success booking!');
    resetForm();
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
          {({ setFieldValue, values }) => (
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
              <DatePicker
                className={styles.formField}
                placeholderText="Booking date"
                selected={values.date}
                onChange={val => setFieldValue('date', val)}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
              />
              <ErrorMessage
                className={styles.formError}
                name="date"
                component="div"
              />
              <Field
                className={clsx(styles.formField, styles.formTextArea)}
                placeholder="Comment"
                name="comment"
                type="text"
                as="textarea"
              />
              <ErrorMessage
                className={styles.formError}
                name="comment"
                component="div"
              />
              <button
                type="submit"
                className={clsx(styles.formBtn, 'blue-btn')}
              >
                Send
              </button>
            </Form>
          )}
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
