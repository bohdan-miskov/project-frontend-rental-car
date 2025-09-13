import { Link } from 'react-router-dom';
import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import clsx from 'clsx';

export default function Header() {
  return (
    <section>
      <div className={`${css.headerContainer} container`}>
        <Link to="/" className={css.headerLogo}>
          <img src={logo} width={104} height={16} alt="logo" />
        </Link>
        <nav>
          <ul className={css.headerNavList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }: { isActive: boolean }) =>
                  clsx(css.headerNavLink, isActive && css.isActive)
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/catalog"
                className={({ isActive }: { isActive: boolean }) =>
                  clsx(css.headerNavLink, isActive && css.isActive)
                }
              >
                Catalog
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
