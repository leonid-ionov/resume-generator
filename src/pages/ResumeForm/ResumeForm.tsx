import { FC } from 'react';
import Input from '../../components/Input/Input.tsx';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import useAppContext from '../../context/useAppContext.tsx';
import Button from '../../components/Button/Button.tsx';
import Select from '../../components/Select/Select.tsx';
import { IconsOptions } from '../../constants/formConstants.ts';
import { IFormData } from '../../types/formTypes.ts';
import TextArea from '../../components/TextArea/TextArea.tsx';

export const ResumeForm: FC = () => {
  const { submitResume, formData } = useAppContext();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: formData,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contacts',
  });
  const onSubmit: SubmitHandler<IFormData> = data => {
    console.log(data);
    submitResume(data);
  };

  return (
    <div>
      <h2>Create your own resume</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Your Name"
          error={errors.userName}
          description="Write here your name"
          placeholder="John Doe"
          {...register('userName', { required: 'required' })}
        />
        <Input
          label="Desired Job"
          error={errors.desiredJob}
          description="Write here your desired job"
          placeholder="Software Engineer"
          {...register('desiredJob', { required: 'required' })}
        />
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3>Contacts</h3>
          <Button onClick={() => append({ info: '', icon: 'Select icon' })}>+</Button>
        </span>
        {fields.map((field, index) => {
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
                  {...register(`contacts.${index}.info`, { required: 'required' })}
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
                  {...register(`contacts.${index}.info`, { required: 'required' })}
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
                  <Button onClick={() => remove(index)}>-</Button>
                </div>
              );
          }
        })}
        <TextArea
          label="About you"
          rows={4}
          description="Tell about yourself"
          {...register('profile', { required: 'required' })}
        />
        <Input
          label="Your Photo"
          description="Photo must be 416x300"
          type="file"
          accept="image/*"
          {...register('photoLink', { required: 'required' })}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
