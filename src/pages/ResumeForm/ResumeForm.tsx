import { FC } from 'react';
import Input from '../../components/Input/Input.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAppContext from '../../context/useAppContext.tsx';
import { TResumeData } from '../ResumeReview/ResumePreview.tsx';

export const ResumeForm: FC = () => {
  const { resumeData, publishResume } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResumeData>({
    defaultValues: { ...resumeData },
  });
  const onSubmit: SubmitHandler<TResumeData> = data => publishResume(data);
  return (
    <div>
      <h2>Resume form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="User Name"
          error={errors.userName}
          description="Write here your name"
          placeholder="John Doe"
          {...register('userName', { required: 'required' })}
        />
        <input type="submit" />
      </form>
    </div>
  );
};
