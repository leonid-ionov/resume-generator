import { FC } from 'react';
import Input from '../../components/Input/Input.tsx';

export const ResumeForm: FC = () => {
  return (
    <div>
      <h2>Resume form</h2>
      <Input
        label="User Name"
        description="Write here your name"
        required
        maxValue={12}
        placeholder="John Doe"
        onChange={(value, isValid) => {
          console.log(value, isValid);
        }}
      />
    </div>
  );
};
