import styles from './ResumeRreview.module.scss';
import { IUserSectionProps, UserSection } from './components/UserSection/UserSection.tsx';
import { FC } from 'react';
import { ContactsSection, IContactElement } from './components/ContactsSection/ContactsSection.tsx';
import { IPersonProfile, ProfileSection } from './components/ProfileSection/ProfileSection.tsx';
import { IPersonPhoto, PhotoSection } from './components/PhotoSection/PhotoSection.tsx';
import { Divider } from '../../components/Divider/Divider.tsx';

export interface IResumePreviewProps {
  userInfo: IUserSectionProps & IPersonProfile & IPersonPhoto;
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
        <PhotoSection photoLink={userInfo.photoLink} />
      </div>
      <div className={styles.flexContainer}>
        <div className={styles.someSection}>
          <div className={styles.experienceSection}>
            <h4 className={styles.sectionTitle}>Work</h4>
            <Divider />
          </div>
        </div>
        <div className={styles.skillsSection}></div>
      </div>
    </div>
  );
};
