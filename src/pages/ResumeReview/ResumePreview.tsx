import styles from './ResumeRreview.module.scss';
import { IUserSectionProps, UserSection } from './components/UserSection/UserSection.tsx';
import { FC } from 'react';
import { ContactsSection, IContactElement } from './components/ContactsSection/ContactsSection.tsx';
import { IPersonProfile, ProfileSection } from './components/ProfileSection/ProfileSection.tsx';
import { IPersonPhoto, PhotoSection } from './components/PhotoSection/PhotoSection.tsx';
import { ExperienceSection, IPositionExplore } from './components/ExperienceSection/ExperienceSection.tsx';
import { IInfoItem, InfoSection } from './components/InfoSection/InfoSection.tsx';
import { IUserSkill, SkillsSection } from './components/SkillsSection/SkillsSection.tsx';
import { EducationSection, IUserEducation } from './components/EducationSection/EducationSection.tsx';
import { InterestsSection, IUserInterest } from './components/InterestsSection/InterestsSection.tsx';
import useAppContext from '../../context/useAppContext.tsx';

export interface IResumePreviewProps {
  userInfo: IUserSectionProps & IPersonProfile & IPersonPhoto & { info: IInfoItem[] };
  contacts: IContactElement[];
  experience: IPositionExplore[];
  skills: IUserSkill[];
  education: IUserEducation[];
  interests: IUserInterest[];
}

export const ResumePreview: FC<IResumePreviewProps> = ({
  userInfo,
  contacts,
  experience,
  education,
  skills,
  interests,
}) => {
  const { resumeData } = useAppContext();
  return (
    <div className={styles.ResumePreview}>
      <div className={styles.Row1}>
        <div className={styles.Row1_content}>
          <UserSection userName={resumeData?.userName ?? userInfo.userName} desiredJob={userInfo.desiredJob} />
          <ContactsSection contacts={contacts} />
        </div>
      </div>
      <div className={styles.Row2}>
        <ProfileSection profile={userInfo.profile} />
        <PhotoSection photoLink={userInfo.photoLink} />
      </div>
      <div className={styles.Row3_Col1}>
        <ExperienceSection experience={experience} />
        <EducationSection educations={education} />
        <InterestsSection interests={interests} />
      </div>
      <div className={styles.Row3_Col2}>
        <InfoSection userInfo={userInfo.info} />
        <SkillsSection skills={skills} />
      </div>
    </div>
  );
};
