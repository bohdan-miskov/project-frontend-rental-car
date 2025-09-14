import css from './NotFound.module.css';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className={css.section}>
      <div className={`container ${css.wrapper}`}>
        <h1 className={css.h1}>404</h1>
        <p className={css.h3}>Car not found</p>
        <Link to="/" type="button" className={`blue-btn ${css.button}`}>
          Back To Home
        </Link>
      </div>
    </section>
  );
}
