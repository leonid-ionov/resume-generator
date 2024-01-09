import { FC } from 'react';
import styles from './PhotoSection.module.scss';
import { IPersonPhoto } from '../../../../types/TResumeData.ts';

export const PhotoSection: FC<IPersonPhoto> = ({ photoLink }) => {
  return (
    <section className={styles.PhotoSection}>
      <img className={styles.PhotoSection_photo} src={photoLink} alt="Applicant photo" />
    </section>
  );
};
