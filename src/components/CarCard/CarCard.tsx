import { Link } from 'react-router-dom';
import type { Car } from '../../types/car';
import styles from './CarCard.module.css';
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../../redux/cars/slice';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/cars/selectors';

export default function CarCard({
  id,
  year,
  brand,
  model,
  type,
  img,
  rentalPrice,
  address,
  rentalCompany,
  mileage,
}: Car) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const addressArray = address.split(', ');
  const mileageDisplay = mileage
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  const isFavorite = favorites?.includes(id);

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(id));
  };

  return (
    <div className={clsx(styles.card, isFavorite && styles.isFavorite)}>
      <button className={styles.cardFavBtn} onClick={handleAddToFavorites}>
        <svg className={styles.cardFavIcon} width={16} height={16}>
          <use
            href={`/icons.svg#icon-heart-${
              isFavorite ? 'filled' : 'transparent'
            }`}
          />
        </svg>
      </button>
      <img
        className={styles.cardImage}
        src={img}
        alt="car image"
        width={276}
        height={268}
      />

      <div className={styles.cardTopContent}>
        <h3 className={styles.cardTitle}>
          {brand} <span className={styles.cardTitleAccent}>{model}</span>,{' '}
          {year}
        </h3>

        <p className={styles.cardPrice}>{`$${rentalPrice}`}</p>
      </div>
      <ul className={styles.cardInfoList}>
        <li className={styles.cardInfoItem}>{addressArray[1]}</li>
        <li className={styles.cardInfoItem}>{addressArray[2]}</li>
        <li className={styles.cardInfoItem}>{rentalCompany}</li>
        <li className={styles.cardInfoItem}>{type}</li>
        <li className={styles.cardInfoItem}>{`${mileageDisplay} km`}</li>
      </ul>

      <Link
        className={clsx(styles.cardDetailsLink, 'blue-btn')}
        to={`/catalog/${id}`}
      >
        Read more
      </Link>
    </div>
  );
}
