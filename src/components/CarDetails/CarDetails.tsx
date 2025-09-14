import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectCarDetails,
  selectCarDetailsError,
  selectCarDetailsLoading,
} from '../../redux/carDetails/selectors';
import { useAppDispatch } from '../../hooks/redux';
import { useEffect } from 'react';
import { getCarDetails } from '../../redux/carDetails/operation';
import styles from './CarDetails.module.css';
import clsx from 'clsx';
import BookForm from '../BookForm/BookForm';
import NotFound from '../NotFound/NotFound';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';

export default function CarDetails() {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const car = useSelector(selectCarDetails);
  const isLoading = useSelector(selectCarDetailsLoading);
  const error = useSelector(selectCarDetailsError);

  const addressArray = car?.address.split(', ');
  const mileageDisplay = car?.mileage
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(getCarDetails(id));
  }, [dispatch, id]);

  return error ? (
    <>
      <NotFound />
      <ErrorToastMessage>{error.message}</ErrorToastMessage>
    </>
  ) : (
    <>
      <section className={styles.detailsSection}>
        <div className={clsx(styles.detailsContainer, 'container')}>
          <div className={styles.detailsLeftSide}>
            <img
              className={styles.detailsImage}
              src={car?.img}
              alt={`${car?.model} photo`}
              width={640}
              height={512}
            />
            <BookForm id={id} />
          </div>
          <div className={styles.detailsRightSide}>
            <h1
              className={styles.detailsTitle}
            >{`${car?.brand} ${car?.model}, ${car?.year}`}</h1>
            <ul className={styles.detailsMainInfoList}>
              <li className={styles.detailsMainInfoItem}>
                <svg width={16} height={16}>
                  <use href="/icons.svg#icon-location" />
                </svg>
                <span>
                  {`${addressArray && addressArray[1]}, ${
                    addressArray && addressArray[2]
                  }`}
                </span>
              </li>
              <li
                className={styles.detailsMainInfoItem}
              >{`Mileage: ${mileageDisplay} km`}</li>
            </ul>
            <p className={styles.detailsPrice}>{`$${car?.rentalPrice}`}</p>
            <p className={styles.detailsDescription}>{car?.description}</p>
            <ul className={styles.detailsList}>
              <li className={styles.detailsItem}>
                <h3 className={styles.detailsSubTitle}>Rental Conditions:</h3>
                <ul className={styles.detailsSubList}>
                  {car?.rentalConditions.map((condition, i) => (
                    <li
                      key={`condition-${i}`}
                      className={styles.detailsSubItem}
                    >
                      <svg width={16} height={16}>
                        <use href="/icons.svg#icon-check-circle" />
                      </svg>
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </li>
              <li className={styles.detailsItem}>
                <h3 className={styles.detailsSubTitle}>Car Specifications:</h3>
                <ul className={styles.detailsSubList}>
                  <li className={styles.detailsSubItem}>
                    <svg width={16} height={16}>
                      <use href="/icons.svg#icon-calendar" />
                    </svg>
                    <span>{`Year: ${car?.year}`}</span>
                  </li>
                  <li className={styles.detailsSubItem}>
                    <svg width={16} height={16}>
                      <use href="/icons.svg#icon-car" />
                    </svg>
                    <span>{`Type: ${car?.type}`}</span>
                  </li>
                  <li className={styles.detailsSubItem}>
                    <svg width={16} height={16}>
                      <use href="/icons.svg#icon-fuel-pump" />
                    </svg>
                    <span>{`Fuel Consumption: ${car?.fuelConsumption}`}</span>
                  </li>
                  <li className={styles.detailsSubItem}>
                    <svg width={16} height={16}>
                      <use href="/icons.svg#icon-gear" />
                    </svg>
                    <span>{`Engine Size: ${car?.engineSize}`}</span>
                  </li>
                </ul>
              </li>
              <li className={styles.detailsItem}>
                <h3 className={styles.detailsSubTitle}>
                  Accessories and functionalities:
                </h3>
                <ul className={styles.detailsSubList}>
                  {[
                    ...(car?.accessories ?? []),
                    ...(car?.functionalities ?? []),
                  ].map((item, i) => (
                    <li
                      key={`advantages-${i}`}
                      className={styles.detailsSubItem}
                    >
                      <svg width={16} height={16}>
                        <use href="/icons.svg#icon-check-circle" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {isLoading && <FullScreenLoader text="Car details loading..." />}
    </>
  );
}
