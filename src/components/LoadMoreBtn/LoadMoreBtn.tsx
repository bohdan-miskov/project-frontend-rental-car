import clsx from 'clsx';
import styles from './LoadMoreBtn.module.css';
import { useDispatch } from 'react-redux';
import { setNextPage } from '../../redux/filters/slice';

export default function LoadMoreBtn() {
  const dispatch = useDispatch();

  const handleSetNextPage = () => {
    dispatch(setNextPage());
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
