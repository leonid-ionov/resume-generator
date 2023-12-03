import styles from './ResumeRreview.module.scss';
import { IUserSectionProps, UserSection } from './components/UserSection/UserSection.tsx';
import { FC } from 'react';
import { ContactsSection, IContactElement } from './components/ContactsSection/ContactsSection.tsx';
import { IPersonProfile, ProfileSection } from './components/ProfileSection/ProfileSection.tsx';

export interface IResumePreviewProps {
  userInfo: IUserSectionProps & IPersonProfile;
  contacts: IContactElement[];
}

export const ResumePreview: FC<IResumePreviewProps> = ({ userInfo, contacts }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleSection}>
        <UserSection userName={userInfo.userName} desiredJob={userInfo.desiredJob} />
        <ContactsSection contacts={contacts} />
      </div>
      <div className={styles.profileSection}>
        <ProfileSection profile={userInfo.profile} />
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
