import Header from '../Header/Header';
import css from './Layout.module.css';
import type { Props } from './Layout.types';

export default function Layout({ children }: Props) {
  return (
    <div className={css.container}>
      <Header />
      <div className={css.mainContent}>{children}</div>
    </div>
  );
}
