import styles from './ResumeRreview.module.scss';
import { IUserSectionProps, UserSection } from './components/UserSection/UserSection.tsx';
import { FC } from 'react';
import { ContactsSection, IContactElement } from './components/ContactsSection/ContactsSection.tsx';
import { IPersonProfile, ProfileSection } from './components/ProfileSection/ProfileSection.tsx';
import { IPersonPhoto, PhotoSection } from './components/PhotoSection/PhotoSection.tsx';
import { ExperienceSection, IPositionExplore } from './components/ExperienceSection/ExperienceSection.tsx';

export interface IResumePreviewProps {
  userInfo: IUserSectionProps & IPersonProfile & IPersonPhoto;
  contacts: IContactElement[];
  experience: IPositionExplore[];
}

export const ResumePreview: FC<IResumePreviewProps> = ({ userInfo, contacts, experience }) => {
  return (
    <div className={styles.ResumePreview}>
      <div className={styles.Row1}>
        <div className={styles.Row1_content}>
          <UserSection userName={userInfo.userName} desiredJob={userInfo.desiredJob} />
          <ContactsSection contacts={contacts} />
        </div>
      </div>
      <div className={styles.Row2}>
        <ProfileSection profile={userInfo.profile} />
        <PhotoSection photoLink={userInfo.photoLink} />
      </div>
      <div className={styles.Row3_Col1}>
        <ExperienceSection experience={experience} />
      </div>
      <div className={styles.Row3_Col2}>
        <div>Skills</div>
      </div>
    </div>
  );
};
