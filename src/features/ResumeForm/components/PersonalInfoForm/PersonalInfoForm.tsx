import { FC, useMemo } from 'react';
import { useController, UseFormSetValue, useWatch } from 'react-hook-form';
import Input from '../../../../components/Input/Input.tsx';
import TextArea from '../../../../components/TextArea/TextArea.tsx';
import styles from './PersonalInfoForm.module.scss';
import { DateInput } from '../../../../components/Input/DateInput.tsx';
import { IFormComponent, IFormData } from '../../../../types/formTypes.ts';
import { UserPhotoForm } from './UserPhotoForm.tsx';

interface IPersonalInfoFormProps extends IFormComponent {
  setFormValue: UseFormSetValue<IFormData>;
}

export const PersonalInfoForm: FC<IPersonalInfoFormProps> = ({ setFormValue, control, register, errors }) => {
  const { formState } = useController({ control, name: 'photoLink' });
  const { photo } = useWatch({ control, name: 'photoLink' });
  const memoizedPhoto = useMemo(() => {
    if (typeof photo === 'string') return photo;
    if (photo instanceof FileList && photo.length > 0) return URL.createObjectURL(photo[0]);
    return null;
  }, [photo]);
  return (
    <section className={styles.formContainer}>
      <UserPhotoForm
        photo={memoizedPhoto}
        registerProps={register('photoLink.photo')}
        initialCrop={formState.defaultValues?.photoLink?.crop}
        handleCropComplete={croppedArea => setFormValue('photoLink.crop', croppedArea)}
      />
      <div className={styles.userProfile_container}>
        <div className={styles.flexContainer}>
          <Input
            label="Your Name"
            error={errors?.userName}
            description="Write here your name"
            placeholder="John Doe"
            {...register('userName')}
          />
          <Input
            label="Desired Job"
            error={errors?.desiredJob}
            description="Write here your desired job"
            placeholder="Software Engineer"
            {...register('desiredJob')}
          />
        </div>
        <div className={styles.flexContainer}>
          <DateInput
            setFormValue={setFormValue}
            dateTimeProps={{
              timeFormat: false,
              closeOnSelect: true,
              momentFormat: 'DD.MM.YYYY',
            }}
            inputProps={{
              ...register('dayOfBirth'),
              placeholder: 'DD.MM.YYYY',
              label: 'Your date of birth',
              className: styles.dateInput,
            }}
          />
          <Input label="Your city of residence" {...register('city')} />
          <Input label="languages you speak" {...register('languages')} />
        </div>
        <TextArea label="About you" rows={4} description="Tell about yourself" {...register('profile')} />
      </div>
    </section>
  );
};
