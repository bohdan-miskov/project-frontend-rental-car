import { ClipLoader } from 'react-spinners';
import styles from './FullScreenLoader.module.css';
import type { Props } from './FullScreenLoader.types';

export default function FullScreenLoader({ text }: Props) {
  return (
    <div className={styles.overlay}>
      <div className="container">
        <div className={styles.container}>
          <ClipLoader color="#3d2218" size={100} />
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </div>
  );
}
