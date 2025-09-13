import { useSelector } from 'react-redux';
import {
  selectCars,
  selectListLoading,
  selectPage,
  selectTotalPages,
} from '../../redux/cars/selectors';
import CarCard from '../CarCard/CarCard';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { selectFiltersPage } from '../../redux/filters/selectors';
import Loader from '../Loader/Loader';
import styles from './CarsList.module.css';

export default function CarsList() {
  const carsList = useSelector(selectCars);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const listLoading = useSelector(selectListLoading);
  const filtersPage = useSelector(selectFiltersPage);

  return (
    <section className={styles.carsSection}>
      <div className="container">
        {listLoading && filtersPage === 1 && <Loader />}
        <ul className={styles.carsList}>
          {carsList.map(car => (
            <li key={car.id}>{<CarCard {...car} />}</li>
          ))}
        </ul>
        {listLoading && filtersPage > 1 && <Loader />}
        {page < totalPages && !listLoading && <LoadMoreBtn />}
      </div>
    </section>
  );
}
