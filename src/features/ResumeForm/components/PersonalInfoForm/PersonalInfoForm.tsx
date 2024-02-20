import { FC, useState } from 'react';
import { useController, UseFormSetValue, useWatch } from 'react-hook-form';
import Input from '../../../../components/Input/Input.tsx';
import TextArea from '../../../../components/TextArea/TextArea.tsx';
import styles from './PersonalInfoForm.module.scss';
import initialPhoto from '../../../../assets/images/initialPhoto.png';
import Cropper from 'react-easy-crop';
import { DateInput } from '../../../../components/Input/DateInput.tsx';
import { IFormComponent, IFormData } from '../../../../types/formTypes.ts';
import FileInput from '../../../../components/Input/FileInput.tsx';

interface IPersonalInfoFormProps extends IFormComponent {
  setFormValue: UseFormSetValue<IFormData>;
}

export const PersonalInfoForm: FC<IPersonalInfoFormProps> = ({ setFormValue, control, register, errors }) => {
  const { formState } = useController({ control, name: 'photoLink' });
  const userPhotoValue = useWatch({ control, name: 'photoLink' });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  return (
    <section className={styles.formContainer}>
      <div className={styles.userPhoto_container}>
        {!userPhotoValue?.photo ? (
          <img className={styles.userPhoto} src={initialPhoto} alt="user photo" />
        ) : (
          <Cropper
            classes={{ containerClassName: styles.userPhoto }}
            aspect={1.39}
            image={
              typeof userPhotoValue.photo === 'string'
                ? userPhotoValue.photo
                : URL.createObjectURL(userPhotoValue.photo[0])
            }
            restrictPosition
            initialCroppedAreaPixels={formState.defaultValues?.photoLink?.crop}
            crop={crop}
            showGrid={false}
            onCropChange={crop => {
              setCrop(prevState => ({ ...prevState, ...crop }));
            }}
            onCropComplete={(_, croppedAreaPixels) => {
              setFormValue('photoLink.crop', croppedAreaPixels);
            }}
          />
        )}
        <FileInput
          fileLabel="Your Photo"
          description="Photo must be 416x300"
          accept="image/*"
          registerProps={register('photoLink.photo')}
        />
      </div>
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
