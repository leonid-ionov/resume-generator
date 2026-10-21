import { FC, useState } from 'react';
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

// react-quill-new (used inside ExperienceForm) touches `document` at import time,
// which breaks Next.js prerendering. Load it client-only.
const ExperienceForm = dynamic(
  () => import('./components/ExperienceForm/ExperienceForm.tsx').then(m => m.ExperienceForm),
  { ssr: false }
);

export const ResumeForm: FC = () => {
  const { submitResume } = useAppContext();
  const { handleSubmit } = useFormContext<IFormData>();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormData> = async data => {
    try {
      setSubmitError(null);
      await submitResume(data);
    } catch (error) {
      console.error('Error when submitting the form:', error);
      setSubmitError('Could not build the resume. Check the form and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.resumeForm}>
      <Button type="submit">Submit changes</Button>
      {submitError && (
        <p role="alert" className={styles.resumeForm_error}>
          {submitError}
        </p>
      )}
      <PersonalInfoForm />
      <ContactsForm />
      <SkillForm />
      <ExperienceForm />
      <EducationForm />
      <InterestsForm />
    </form>
  );
};
