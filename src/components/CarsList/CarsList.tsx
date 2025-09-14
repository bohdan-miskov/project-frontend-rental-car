import { useSelector } from 'react-redux';
import {
  selectCars,
  selectListError,
  selectListLoading,
  selectPage,
  selectTotalPages,
} from '../../redux/cars/selectors';
import CarCard from '../CarCard/CarCard';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { selectFiltersPage } from '../../redux/filters/selectors';
import styles from './CarsList.module.css';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { getCars } from '../../redux/cars/operation';
import Loader from '../Loader/Loader';
import NotFoundCars from '../NotFoundCars/NotFoundCars';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';

export default function CarsList() {
  const dispatch = useAppDispatch();

  const carsList = useSelector(selectCars);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const listLoading = useSelector(selectListLoading);
  const error = useSelector(selectListError);
  const filtersPage = useSelector(selectFiltersPage);

  useEffect(() => {
    dispatch(getCars(null));
  }, [dispatch]);

  return (
    <>
      <section className={styles.carsSection}>
        <div className="container">
          <h2 className="visually-hidden">Cars</h2>
          {listLoading && filtersPage === 1 && <Loader />}
          {carsList.length > 0 ? (
            <ul className={styles.carsList}>
              {carsList.map(car => (
                <li key={car.id} className={styles.carsItem}>
                  {<CarCard {...car} />}
                </li>
              ))}
            </ul>
          ) : (
            <NotFoundCars />
          )}
          {listLoading && filtersPage > 1 && <Loader />}
          {page < totalPages && !listLoading && <LoadMoreBtn />}
        </div>
      </section>
      {error && <ErrorToastMessage>{error.message}</ErrorToastMessage>}
    </>
  );
}
