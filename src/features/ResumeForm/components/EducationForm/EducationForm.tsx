import { FC } from 'react';
import Input from '../../../../components/Input/Input.tsx';
import { DateInput } from '../../../../components/Input/DateInput.tsx';
import Button from '../../../../components/Button/Button.tsx';
import { Accordion } from '../../../../components/Accordion/Accordion.tsx';
import { IFormComponent, IFormData } from '../../../../types/formTypes.ts';
import { useFieldArray, UseFormSetValue } from 'react-hook-form';

interface IEducationFormProps extends IFormComponent {
  setFormValue: UseFormSetValue<IFormData>;
}

export const EducationForm: FC<IEducationFormProps> = ({ control, register, setFormValue }) => {
  const educationField = useFieldArray({
    control,
    name: 'education',
  });

  return (
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
              setFormValue={setFormValue}
              dateTimeProps={dateTimeProps}
              inputProps={{
                ...register(`education.${index}.startDate`),
                placeholder: 'YYYY',
                label: 'Start date of education',
              }}
            />
            <DateInput
              setFormValue={setFormValue}
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
  );
};
