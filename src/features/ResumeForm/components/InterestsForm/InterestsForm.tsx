import { FC } from 'react';
import { IFormComponent } from '../../../../types/formTypes.ts';
import Input from '../../../../components/Input/Input.tsx';
import Button from '../../../../components/Button/Button.tsx';
import { Accordion } from '../../../../components/Accordion/Accordion.tsx';
import { useFieldArray, useWatch } from 'react-hook-form';
import FileInput from '../../../../components/Input/FileInput.tsx';

export const InterestsForm: FC<IFormComponent> = ({ control, register }) => {
  const interestsField = useFieldArray({
    control,
    name: 'interests',
  });
  const interestsValues = useWatch({ control, name: 'interests' });
  return (
    <Accordion title="Interests">
      {interestsField.fields.map((field, index) => (
        <div key={field.id}>
          <Input label="Name of interest" placeholder="Cooking" {...register(`interests.${index}.name`)} />
          <FileInput
            isFileSelected={!!interestsValues[index]?.icon}
            fileLabel="Upload Icon for interest"
            registerProps={register(`interests.${index}.icon`)}
          />
        </div>
      ))}
      <Button onClick={() => interestsField.append({ name: '', icon: '' })}>Tell about your interests</Button>
    </Accordion>
  );
};
