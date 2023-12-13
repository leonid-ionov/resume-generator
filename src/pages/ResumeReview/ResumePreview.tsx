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
import { useLocation } from 'react-router-dom';
import { resumePreviewData } from '../../constants/resumePreviewData.tsx';

export type TResumeData = IUserSectionProps &
  IPersonProfile &
  IPersonPhoto & {
    info: IInfoItem[];
    contacts: IContactElement[];
    experience: IPositionExplore[];
    skills: IUserSkill[];
    education: IUserEducation[];
    interests: IUserInterest[];
  };

export const ResumePreview: FC = () => {
  const location = useLocation();
  const appContext = useAppContext();
  const state = location.state as { isPreview?: boolean };
  const resumeData = state.isPreview ? resumePreviewData : { ...resumePreviewData, ...appContext.resumeData };
  console.log(resumeData);
  return (
    <div className={styles.ResumePreview}>
      <div className={styles.Row1}>
        <div className={styles.Row1_content}>
          <UserSection userName={resumeData.userName} desiredJob={resumeData.desiredJob} />
          <ContactsSection contacts={resumeData.contacts} />
        </div>
      </div>
      <div className={styles.Row2}>
        <ProfileSection profile={resumeData.profile} />
        <PhotoSection photoLink={resumeData.photoLink} />
      </div>
      <div className={styles.Row3_Col1}>
        <ExperienceSection experience={resumeData.experience} />
        <EducationSection educations={resumeData.education} />
        <InterestsSection interests={resumeData.interests} />
      </div>
      <div className={styles.Row3_Col2}>
        <InfoSection userInfo={resumeData.info} />
        <SkillsSection skills={resumeData.skills} />
      </div>
    </div>
  );
};
