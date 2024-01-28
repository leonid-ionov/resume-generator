import { ChangeEvent, FC, useState } from 'react';
import Input from '../../components/Input/Input.tsx';
import { Control, SubmitHandler, useFieldArray, useForm, UseFormRegister } from 'react-hook-form';
import useAppContext from '../../context/useAppContext.tsx';
import Button from '../../components/Button/Button.tsx';
import Select from '../../components/Select/Select.tsx';
import { IconsOptions } from '../../constants/formConstants.ts';
import { IFormData } from '../../types/formTypes.ts';
import TextArea from '../../components/TextArea/TextArea.tsx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { convertToImageString } from '../../utils/convertToImageString.ts';
import { DateInput } from '../../components/Input/DateInput.tsx';
import { Accordion } from '../../components/Accordion/Accordion.tsx';
import Cropper, { Point } from 'react-easy-crop';
import styles from '../../features/ResumeForm/ResumeForm.module.scss';

const SkillDetailsArray = ({
  nestIndex,
  control,
  register,
}: {
  nestIndex: number;
  control: Control<IFormData>;
  register: UseFormRegister<IFormData>;
}) => {
  const skillDetailsField = useFieldArray({
    control,
    name: `skills.${nestIndex}.details`,
  });

  return (
    <>
      <Button
        onClick={() => {
          if (skillDetailsField.fields[0]?.variant === undefined) {
            skillDetailsField.update(0, { variant: '', level: '50%' });
          } else skillDetailsField.append({ variant: '', level: '50%' });
        }}
      >
        Add variant to your skill
      </Button>
      {skillDetailsField.fields.map((field, index) => {
        if (field.variant === undefined) return null;
        return (
          <div key={field.id}>
            <Input
              label="Name of variant"
              placeholder="My awesome skill"
              {...register(`skills.${nestIndex}.details.${index}.variant`)}
            />
            <Input
              type="range"
              label="Your skill variant level"
              {...register(`skills.${nestIndex}.details.${index}.level`)}
            />
          </div>
        );
      })}
    </>
  );
};

export const ResumeForm: FC = () => {
  const { submitResume, formData } = useAppContext();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    getValues,
  } = useForm<IFormData>({
    defaultValues: formData,
  });
  const contactsField = useFieldArray({
    control,
    name: 'contacts',
  });
  const skillsField = useFieldArray({
    control,
    name: 'skills',
  });
  const experienceField = useFieldArray({
    control,
    name: 'experience',
  });
  const educationField = useFieldArray({
    control,
    name: 'education',
  });
  const interestsField = useFieldArray({
    control,
    name: 'interests',
  });
  const onSubmit: SubmitHandler<IFormData> = data => {
    submitResume(data);
  };

  const handleSave = async () => {
    const { interests, photoLink, ...rest } = getValues();
    const photo = await convertToImageString(photoLink.photo);
    const normalizedFormData = {
      ...rest,
      photoLink: { photo, crop: photoLink.crop },
      interests: await Promise.all(
        interests.map(async interest => ({
          ...interest,
          icon: await convertToImageString(interest.icon, { width: 60, height: 60 }),
        }))
      ),
    };
    const jsonFormData = JSON.stringify(normalizedFormData);
    const blobFormData = new Blob([jsonFormData], { type: 'application/json' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blobFormData);
    downloadLink.download = `Resume Form ${formData.userName}`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(downloadLink.href);
  };

  const handleLoad = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = fileInput.files && fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const data = JSON.parse(e.target?.result as string) as IFormData;
          (Object.keys(data) as (keyof IFormData)[]).forEach(value => {
            if (value in data) {
              setValue(value, data[value]);
            }
          });
        } catch (error) {
          console.error('Error when loading a form file:', error);
        }
      };
      reader.readAsText(file);
    }
  };
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const userPhotoValue = watch('photoLink');
  register('photoLink.crop');
  return (
    <div>
      <h2>Create your own resume</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Accordion title="Personal Info">
          <Input
            label="Your Name"
            error={errors.userName}
            description="Write here your name"
            placeholder="John Doe"
            {...register('userName')}
          />
          <Input
            label="Desired Job"
            error={errors.desiredJob}
            description="Write here your desired job"
            placeholder="Software Engineer"
            {...register('desiredJob')}
          />
          <TextArea label="About you" rows={4} description="Tell about yourself" {...register('profile')} />
          <div className={styles.userPhoto_container}>
            <Cropper
              aspect={1.39}
              image={
                typeof userPhotoValue.photo === 'string'
                  ? userPhotoValue.photo
                  : URL.createObjectURL(userPhotoValue.photo[0])
              }
              objectFit="cover"
              crop={crop}
              showGrid={false}
              onCropChange={crop => {
                setCrop(prevState => ({ ...prevState, ...crop }));
              }}
              onCropComplete={(_, croppedAreaPixels) => {
                setValue('photoLink.crop', croppedAreaPixels);
              }}
            />
          </div>
          <Input
            label="Your Photo"
            description="Photo must be 416x300"
            type="file"
            accept="image/*"
            {...register('photoLink.photo')}
          />
          <DateInput
            setFormValue={setValue}
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
        <Accordion title="Contacts">
          {contactsField.fields.map((field, index) => {
            switch (index) {
              case 0:
                return (
                  <Input
                    key={field.id}
                    label="Email"
                    type="email"
                    error={errors.contacts?.[index]?.info}
                    description="Add email address"
                    placeholder="example@example.com"
                    {...register(`contacts.${index}.info`)}
                  />
                );
              case 1:
                return (
                  <Input
                    key={field.id}
                    label="Phone number"
                    type="tel"
                    error={errors.contacts?.[index]?.info}
                    description="Add phone number"
                    placeholder="123-456-7890"
                    {...register(`contacts.${index}.info`)}
                  />
                );
              default:
                return (
                  <div key={field.id} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <Input
                      key={field.id}
                      label="New contact"
                      placeholder="My LinkedIn"
                      error={errors.contacts?.[index]?.info}
                      description="Add another contact information"
                      {...register(`contacts.${index}.info`)}
                    />
                    <Select
                      control={control}
                      label="Icon"
                      placeholder="Select icon"
                      description="Select icon"
                      options={IconsOptions}
                      error={errors.contacts?.[index]?.icon}
                      {...register(`contacts.${index}.icon`)}
                    />
                    <Button onClick={() => contactsField.remove(index)}>-</Button>
                  </div>
                );
            }
          })}
          <Button onClick={() => contactsField.append({ info: '', icon: 'Select icon' })}>Add another contact</Button>
        </Accordion>
        <Accordion title="Skills">
          {skillsField.fields.map((field, skillIndex) => {
            const isSkillHaveVariant = watch(`skills.${skillIndex}.details.0.variant`) !== undefined;
            return (
              <div key={field.id}>
                <Input
                  label="Name of skill"
                  placeholder="My awesome skill"
                  error={errors.skills?.[skillIndex]?.name}
                  {...register(`skills.${skillIndex}.name`)}
                />
                {!isSkillHaveVariant && (
                  <Input type="range" label="Your skill level" {...register(`skills.${skillIndex}.details.0.level`)} />
                )}
                <SkillDetailsArray nestIndex={skillIndex} control={control} register={register} />
              </div>
            );
          })}
          <Button onClick={() => skillsField.append({ name: '', details: [{ level: '50%' }] })}>Add new skill</Button>
        </Accordion>
        <Accordion title="Experience">
          {experienceField.fields.map((field, index) => {
            register(`experience.${index}.description`);
            const descriptionValue = watch(`experience.${index}.description`);
            const dateTimeProps = {
              timeFormat: false,
              dateFormat: 'MM.YYYY',
              momentFormat: 'MM.YYYY',
              closeOnSelect: true,
            };
            return (
              <div key={field.id}>
                <Input
                  label="Position name"
                  placeholder="Software Engineer"
                  {...register(`experience.${index}.positionName`)}
                />
                <Input label="Company name" placeholder="Microsoft" {...register(`experience.${index}.companyName`)} />
                <DateInput
                  setFormValue={setValue}
                  dateTimeProps={dateTimeProps}
                  inputProps={{
                    ...register(`experience.${index}.startDate`),
                    placeholder: 'MM.YYYY',
                    label: 'Start date of working',
                  }}
                />
                <DateInput
                  setFormValue={setValue}
                  dateTimeProps={dateTimeProps}
                  inputProps={{
                    ...register(`experience.${index}.endDate`),
                    placeholder: 'MM.YYYY',
                    label: 'End date of working',
                  }}
                />
                <ReactQuill
                  theme="snow"
                  modules={{
                    clipboard: { matchVisual: false },
                    toolbar: [
                      [{ header: [3, 4, 5, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      [{ align: [] }],
                      ['clean'],
                    ],
                  }}
                  value={descriptionValue}
                  onChange={value => setValue(`experience.${index}.description`, value)}
                />
              </div>
            );
          })}
          <Button
            onClick={() =>
              experienceField.append({
                positionName: '',
                description: '',
                startDate: '',
                endDate: '',
                companyName: '',
              })
            }
          >
            Tell about your experience
          </Button>
        </Accordion>
        <Accordion title="Education">
          {educationField.fields.map((field, index) => {
            const dateTimeProps = {
              timeFormat: false,
              dateFormat: 'YYYY',
              momentFormat: 'YYYY',
              closeOnSelect: true,
            };
            return (
              <div key={field.id}>
                <Input
                  label="Your institution name"
                  placeholder="Harvard"
                  {...register(`education.${index}.institution`)}
                />
                <Input
                  label="Your speciality"
                  placeholder="Master of finance"
                  {...register(`education.${index}.speciality`)}
                />
                <DateInput
                  setFormValue={setValue}
                  dateTimeProps={dateTimeProps}
                  inputProps={{
                    ...register(`education.${index}.startDate`),
                    placeholder: 'YYYY',
                    label: 'Start date of education',
                  }}
                />
                <DateInput
                  setFormValue={setValue}
                  dateTimeProps={dateTimeProps}
                  inputProps={{
                    ...register(`education.${index}.endDate`),
                    placeholder: 'YYYY',
                    label: 'End date of education',
                  }}
                />
                <Input
                  label="Add some description"
                  placeholder="Department Name"
                  {...register(`education.${index}.description`)}
                />
              </div>
            );
          })}
          <Button
            onClick={() =>
              educationField.append({ speciality: '', institution: '', startDate: '', endDate: '', description: '' })
            }
          >
            Tell about your education
          </Button>
        </Accordion>
        <Accordion title="Interests">
          {interestsField.fields.map((field, index) => (
            <div key={field.id}>
              <Input label="Name of interest" placeholder="Cooking" {...register(`interests.${index}.name`)} />
              <Input label="Icon for interest" type="file" {...register(`interests.${index}.icon`)} />
            </div>
          ))}
          <Button onClick={() => interestsField.append({ name: '', icon: '' })}>Tell about your interests</Button>
        </Accordion>

        <Button type="submit">Submit</Button>
        <Button onClick={handleSave}>Сохранить в JSON</Button>
        <input type="file" accept=".json" onChange={handleLoad} />
      </form>
    </div>
  );
};
