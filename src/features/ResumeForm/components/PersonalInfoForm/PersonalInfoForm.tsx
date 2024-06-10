import { FC, useMemo } from 'react';
import { FieldPath, useFormContext, useWatch } from 'react-hook-form';
import Input from '../../../../components/Input/Input.tsx';
import TextArea from '../../../../components/TextArea/TextArea.tsx';
import styles from './PersonalInfoForm.module.scss';
import { DateInput } from '../../../../components/Input/DateInput.tsx';
import { IFormData } from '../../../../types/formTypes.ts';
import { UserPhotoForm } from './UserPhotoForm.tsx';
import { Area } from 'react-easy-crop';

export const PersonalInfoForm: FC = () => {
  const {
    control,
    setValue,
    register,
    formState: { defaultValues, errors },
  } = useFormContext<IFormData>();

  const { photo } = useWatch({ control, name: 'photoLink' });
  const memorizedPhoto = useMemo(() => {
    if (typeof photo === 'string') return photo;
    if (photo instanceof FileList && photo.length > 0) return URL.createObjectURL(photo[0]);
    return null;
  }, [photo]);

  const handleDateChange = (name: FieldPath<IFormData>) => (value: string) => {
    setValue(name, value);
  };

  return (
    <section className={styles.formContainer}>
      <UserPhotoForm
        photo={memorizedPhoto}
        registerProps={register('photoLink.photo')}
        initialCrop={defaultValues?.photoLink?.crop as Area}
        handleCropComplete={croppedArea => setValue('photoLink.crop', croppedArea)}
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
            handleChange={handleDateChange('dayOfBirth')}
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
