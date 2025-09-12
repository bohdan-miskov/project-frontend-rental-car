import css from './Layout.module.css';
import type { Props } from './Layout.types';

export default function Layout({ children }: Props) {
  return (
    <div className={css.container}>
      <div className={css.mainContent}>{children}</div>
    </div>
  );
}
