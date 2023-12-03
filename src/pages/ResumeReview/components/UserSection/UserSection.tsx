import { FC } from 'react';
import styles from './UserSection.module.scss';
import { Divider } from '../../../../components/Divider/Divider.tsx';

export interface IUserSectionProps {
  userName: string;
  desiredJob: string;
}

export const UserSection: FC<IUserSectionProps> = ({ userName, desiredJob }) => (
  <section className={styles.UserSection}>
    <p className={styles.UserSection_name}>{userName}</p>
    <p className={styles.UserSection_job}>{desiredJob}</p>
    <Divider white large />
  </section>
);
