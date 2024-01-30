import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormData } from '../../types/formTypes.ts';
import Button from '../../components/Button/Button.tsx';
import styles from './ResumeForm.module.scss';
import { ContactsForm } from './components/ContactsForm/ContactsForm.tsx';
import { SkillForm } from './components/SkillForm/SkillForm.tsx';
import { PersonalInfoForm } from './components/PersonalInfoForm/PersonalInfoForm.tsx';
import { ExperienceForm } from './components/ExperienceForm/ExperienceForm.tsx';
import { EducationForm } from './components/EducationForm/EducationForm.tsx';
import { InterestsForm } from './components/InterestsForm/InterestsForm.tsx';
import useAppContext from '../../context/useAppContext.tsx';

export const ResumeForm: FC = () => {
  const { submitResume, formData, isLoadSavedFormData } = useAppContext();
  const {
    reset,
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: formData,
  });

  useEffect(() => {
    if (isLoadSavedFormData) {
      reset(formData);
    }
  }, [formData, reset, isLoadSavedFormData]);

  const onSubmit: SubmitHandler<IFormData> = async data => {
    await submitResume(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.resumeForm}>
      <PersonalInfoForm setFormValue={setValue} control={control} register={register} errors={errors} />
      <ContactsForm control={control} register={register} errors={errors} />
      <SkillForm control={control} register={register} errors={errors} />
      <ExperienceForm setFormValue={setValue} control={control} register={register} />
      <EducationForm setFormValue={setValue} control={control} register={register} />
      <InterestsForm control={control} register={register} />
      <Button type="submit">Submit</Button>
    </form>
  );
};
