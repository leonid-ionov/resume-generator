import { FC } from 'react';
import styles from './UserSection.module.scss';
import { Divider } from '../../../../components/Divider/Divider.tsx';

export interface IUserSectionProps {
  userName: string;
  desiredJob: string;
}

export const UserSection: FC<IUserSectionProps> = ({ userName, desiredJob }) => (
  <section className={styles.UserSection}>
    <h2 className={styles.UserSection_name}>{userName}</h2>
    <h3 className={styles.UserSection_job}>{desiredJob}</h3>
    <Divider white large />
  </section>
);
