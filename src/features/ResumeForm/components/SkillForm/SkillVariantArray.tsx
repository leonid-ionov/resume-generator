import { useFieldArray } from 'react-hook-form';
import { IFormComponent } from '../../../../types/formTypes.ts';
import Button from '../../../../components/Button/Button.tsx';
import Input from '../../../../components/Input/Input.tsx';
import { FC } from 'react';

interface ISkillVariantArray extends IFormComponent {
  nestIndex: number;
}

export const SkillVariantArray: FC<ISkillVariantArray> = ({ nestIndex, control, register }) => {
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
