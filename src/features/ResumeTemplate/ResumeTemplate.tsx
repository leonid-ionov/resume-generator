import { forwardRef } from 'react';
import styles from './ResumeTemplate.module.scss';
import { UserSection } from './components/UserSection/UserSection.tsx';
import { ContactsSection } from './components/ContactsSection/ContactsSection.tsx';
import { ProfileSection } from './components/ProfileSection/ProfileSection.tsx';
import { PhotoSection } from './components/PhotoSection/PhotoSection.tsx';
import { ExperienceSection } from './components/ExperienceSection/ExperienceSection.tsx';
import { EducationSection } from './components/EducationSection/EducationSection.tsx';
import { InterestsSection } from './components/InterestsSection/InterestsSection.tsx';
import { InfoSection } from './components/InfoSection/InfoSection.tsx';
import { SkillsSection } from './components/SkillsSection/SkillsSection.tsx';
import { TResumeData } from '../../types/TResumeData.ts';

interface IResumeTemplateProps {
  resumeData: TResumeData;
}

const ResumeTemplate = forwardRef<HTMLDivElement, IResumeTemplateProps>(({ resumeData }, ref) => (
  <div ref={ref} className={styles.ResumePreview}>
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
));

ResumeTemplate.displayName = 'ResumeTemplate';

export default ResumeTemplate;
