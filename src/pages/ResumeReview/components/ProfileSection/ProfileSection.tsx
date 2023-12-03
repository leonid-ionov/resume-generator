import { FC } from 'react';
import styles from './ProfileSection.module.scss';
import { Divider } from '../../../../components/Divider/Divider.tsx';

export interface IPersonProfile {
  profile: string;
}

export const ProfileSection: FC<IPersonProfile> = ({ profile }) => {
  return (
    <section className={styles.ProfileSection}>
      <h4 className={styles.ProfileSection_title}>Profile</h4>
      <Divider />
      <article className={styles.ProfileSection_profile}>{profile}</article>
    </section>
  );
};
