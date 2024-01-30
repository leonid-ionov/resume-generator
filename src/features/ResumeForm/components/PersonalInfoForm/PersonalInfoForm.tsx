import { FC, useState } from 'react';
import { UseFormSetValue, useWatch } from 'react-hook-form';
import Input from '../../../../components/Input/Input.tsx';
import TextArea from '../../../../components/TextArea/TextArea.tsx';
import styles from '../../ResumeForm.module.scss';
import initialPhoto from '../../../../assets/images/initialPhoto.png';
import Cropper from 'react-easy-crop';
import { DateInput } from '../../../../components/Input/DateInput.tsx';
import { Accordion } from '../../../../components/Accordion/Accordion.tsx';
import { IFormComponent, IFormData } from '../../../../types/formTypes.ts';

interface IPersonalInfoFormProps extends IFormComponent {
  setFormValue: UseFormSetValue<IFormData>;
}

export const PersonalInfoForm: FC<IPersonalInfoFormProps> = ({ setFormValue, control, register, errors }) => {
  const userPhotoValue = useWatch({ control, name: 'photoLink' });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  return (
    <Accordion title="Personal Info" isExpanded>
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
      <TextArea label="About you" rows={4} description="Tell about yourself" {...register('profile')} />
      <div className={styles.userPhoto_container}>
        {!userPhotoValue?.crop ? (
          <img src={initialPhoto} alt="user photo" />
        ) : (
          <Cropper
            aspect={1.39}
            image={
              typeof userPhotoValue.photo === 'string'
                ? userPhotoValue.photo
                : URL.createObjectURL(userPhotoValue.photo[0])
            }
            restrictPosition
            initialCroppedAreaPixels={userPhotoValue?.crop}
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
      </div>
      <Input
        label="Your Photo"
        description="Photo must be 416x300"
        type="file"
        accept="image/*"
        {...register('photoLink.photo')}
      />
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
        }}
      />
      <Input label="Your city of residence" {...register('city')} />
      <Input label="languages you speak" {...register('languages')} />
    </Accordion>
  );
};
