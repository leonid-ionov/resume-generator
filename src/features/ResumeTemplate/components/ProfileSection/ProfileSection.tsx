import { FC } from 'react';
import styles from './ProfileSection.module.scss';
import { SectionTitle } from '../../../../components/SectionTitle/SectionTitle.tsx';
import { IPersonProfile } from '../../../../types/TResumeData.ts';

export const ProfileSection: FC<IPersonProfile> = ({ profile }) => {
  return (
    <section className={styles.ProfileSection}>
      <SectionTitle title="Profile" />
      <article className={styles.ProfileSection_profile}>{profile}</article>
    </section>
  );
};
