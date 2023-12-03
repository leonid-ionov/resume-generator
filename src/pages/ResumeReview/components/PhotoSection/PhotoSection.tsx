import { FC } from 'react';
import styles from './PhotoSection.module.scss';

export interface IPersonPhoto {
  photoLink: string;
}

export const PhotoSection: FC<IPersonPhoto> = ({ photoLink }) => {
  return (
    <section className={styles.PhotoSection}>
      <img className={styles.PhotoSection_photo} src={photoLink} alt="Applicant photo" />
    </section>
  );
};
