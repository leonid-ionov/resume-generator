import { FC } from 'react';
import styles from './PhotoSection.module.scss';

export const PhotoSection: FC = () => {
  return (
    <section className={styles.PhotoSection}>
      <img className={styles.PhotoSection_photo} src="./" alt="Applicant photo" />
    </section>
  );
};
