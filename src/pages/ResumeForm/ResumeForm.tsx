import { FC } from 'react';
import Input from '../../components/Input/Input.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAppContext from '../../context/useAppContext.tsx';

interface IFormValues {
  'User Name': string;
}
export const ResumeForm: FC = () => {
  const { resumeData, publishResume } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      ['User Name']: resumeData?.userName,
    },
  });
  const onSubmit: SubmitHandler<IFormValues> = data => publishResume({ userName: data['User Name'] });
  return (
    <div>
      <h2>Resume form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors['User Name']}
          description="Write here your name"
          placeholder="John Doe"
          {...register('User Name', { required: 'required' })}
        />
        <input type="submit" />
      </form>
    </div>
  );
};
