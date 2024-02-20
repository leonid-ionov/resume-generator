import { IFormComponent } from '../../../../types/formTypes.ts';
import { FC } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';
import Input from '../../../../components/Input/Input.tsx';
import { SkillVariantArray } from './SkillVariantArray.tsx';
import Button from '../../../../components/Button/Button.tsx';
import { Accordion } from '../../../../components/Accordion/Accordion.tsx';

export const SkillForm: FC<IFormComponent> = ({ control, register, errors }) => {
  const skillsField = useFieldArray({
    control,
    name: 'skills',
  });
  const skillsArray = useWatch({ control, name: 'skills' });

  return (
    <Accordion title="Skills">
      {skillsField.fields.map((field, skillIndex) => {
        const isSkillHaveVariant = skillsArray[skillIndex].details[0].variant !== undefined;
        return (
          <div key={field.id}>
            <Input
              label="Name of skill"
              placeholder="My awesome skill"
              error={errors?.skills?.[skillIndex]?.name}
              {...register(`skills.${skillIndex}.name`)}
            />
            {!isSkillHaveVariant && (
              <Input type="range" label="Your skill level" {...register(`skills.${skillIndex}.details.0.level`)} />
            )}
            <SkillVariantArray nestIndex={skillIndex} control={control} register={register} />
          </div>
        );
      })}
      <Button onClick={() => skillsField.append({ name: '', details: [{ level: '50%' }] })}>Add new skill</Button>
    </Accordion>
  );
};