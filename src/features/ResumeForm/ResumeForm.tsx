import { FC } from 'react';
import dynamic from 'next/dynamic';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { IFormData } from '../../types/formTypes.ts';
import Button from '../../components/Button/Button.tsx';
import styles from './ResumeForm.module.scss';
import { ContactsForm } from './components/ContactsForm/ContactsForm.tsx';
import { SkillForm } from './components/SkillForm/SkillForm.tsx';
import { PersonalInfoForm } from './components/PersonalInfoForm/PersonalInfoForm.tsx';
import { EducationForm } from './components/EducationForm/EducationForm.tsx';
import { InterestsForm } from './components/InterestsForm/InterestsForm.tsx';
import useAppContext from '../../context/useAppContext.tsx';

// react-quill (used inside ExperienceForm) touches `document` at import time,
// which breaks Next.js prerendering. Load it client-only.
const ExperienceForm = dynamic(
  () => import('./components/ExperienceForm/ExperienceForm.tsx').then(m => m.ExperienceForm),
  { ssr: false }
);

export const ResumeForm: FC = () => {
  const { submitResume } = useAppContext();
  const { handleSubmit } = useFormContext<IFormData>();

  const onSubmit: SubmitHandler<IFormData> = async data => {
    await submitResume(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.resumeForm}>
      <Button type="submit">Submit changes</Button>
      <PersonalInfoForm />
      <ContactsForm />
      <SkillForm />
      <ExperienceForm />
      <EducationForm />
      <InterestsForm />
    </form>
  );
};
