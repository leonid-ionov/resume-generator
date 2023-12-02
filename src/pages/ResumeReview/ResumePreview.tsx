import styles from './ResumeRreview.module.scss';
import { Divider } from '../../components/Divider.tsx';
import { IUserSectionProps, UserSection } from './components/UserSection/UserSection.tsx';
import { FC } from 'react';
import { ContactsSection } from './components/ContactsSection/ContactsSection.tsx';

export interface IResumePreviewProps {
  userInfo: IUserSectionProps;
}

export const ResumePreview: FC<IResumePreviewProps> = ({ userInfo }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleSection}>
        <UserSection userName={userInfo.userName} desiredJob={userInfo.desiredJob} />
        <ContactsSection />
      </div>
      <div className={styles.profileSection}>
        <div className={styles.profile}>
          <h4 className={styles.sectionTitle}>Profile</h4>
          <Divider />
          <p className={styles.profile_description}>
            I am deeply passionate about my work - I rejoice in every success in the project and use every opportunity
            for professional growth. And I think that development is quite an exciting! Moreover, I have a great
            technical background - 6 years of experience in the field of technical engineering, practical experience as
            a senior engineer at a previous job. In addition, I am super-friendly, open-minded and optimistic. You will
            enjoy working with me.
          </p>
        </div>
        <div className={styles.photo}>some photo</div>
      </div>
      <div className={styles.flexContainer}>
        <div className={styles.flexColumnContainer}>
          <div className={styles.experienceSection}>
            <h4 className={styles.sectionTitle}>Work</h4>
            <div className={styles.divider} />
          </div>
        </div>
        <div className={styles.flexColumnContainer}></div>
      </div>
    </div>
  );
};
