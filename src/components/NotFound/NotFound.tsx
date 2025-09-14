import css from './NotFound.module.css';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className={css.section}>
      <div className={`container ${css.wrapper}`}>
        <h1 className={css.h1}>404</h1>
        <p className={css.text}>Car not found</p>
        <Link to="/catalog" type="button" className={`blue-btn ${css.button}`}>
          Back To Catalog
        </Link>
      </div>
    </section>
  );
}
