import css from './NotFoundCars.module.css';
import { clearFilters } from '../../redux/filters/slice';
import { getCars } from '../../redux/cars/operation';
import { useAppDispatch } from '../../hooks/redux';

export default function NotFoundCars() {
  const dispatch = useAppDispatch();

  const handleResetFilters = () => {
    dispatch(clearFilters());
    dispatch(getCars(null));
  };
  return (
    <div className={css.container}>
      <p className={css.text}>Unfortunately, no matching results were found.</p>
      <button
        type="button"
        onClick={handleResetFilters}
        className={`${css.btn} blue-btn`}
      >
        Reset filters
      </button>
    </div>
  );
}
