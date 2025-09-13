import { Link } from 'react-router-dom';
import css from './Hero.module.css';

export default function Hero() {
  return (
    <section>
      <div className={`${css.heroContainer} container`}>
        <h1 className={css.heroTitle}>Find your perfect rental car</h1>
        <p className={css.heroText}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link to="/catalog" className={`${css.heroBtn} blue-btn`}>
          View Catalog
        </Link>
      </div>
    </section>
  );
}
