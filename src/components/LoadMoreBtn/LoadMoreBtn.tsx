import clsx from 'clsx';
import styles from './LoadMoreBtn.module.css';
import { setNextPage } from '../../redux/filters/slice';
import { getCars } from '../../redux/cars/operation';
import { useAppDispatch } from '../../hooks/redux';

export default function LoadMoreBtn() {
  const dispatch = useAppDispatch();

  const handleSetNextPage = () => {
    dispatch(setNextPage());
    dispatch(getCars(null));
  };

  return (
    <button
      className={clsx(styles.loadBtn, 'border-btn')}
      onClick={handleSetNextPage}
    >
      Load more
    </button>
  );
}
