import { FC } from 'react';
import { IFormComponent, IFormData } from '../../../../types/formTypes.ts';
import { useFieldArray, UseFormSetValue, useWatch } from 'react-hook-form';
import Input from '../../../../components/Input/Input.tsx';
import { DateInput } from '../../../../components/Input/DateInput.tsx';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import Button from '../../../../components/Button/Button.tsx';
import { Accordion } from '../../../../components/Accordion/Accordion.tsx';

interface IExperienceFormProps extends IFormComponent {
  setFormValue: UseFormSetValue<IFormData>;
}

export const ExperienceForm: FC<IExperienceFormProps> = ({ control, register, setFormValue }) => {
  const experienceField = useFieldArray({
    control,
    name: 'experience',
  });
  const experienceValue = useWatch({ control, name: 'experience' });

  return (
    <Accordion title="Experience">
      {experienceField.fields.map((field, index) => {
        register(`experience.${index}.description`);
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
              setFormValue={setFormValue}
              dateTimeProps={dateTimeProps}
              inputProps={{
                ...register(`experience.${index}.startDate`),
                placeholder: 'MM.YYYY',
                label: 'Start date of working',
              }}
            />
            <DateInput
              setFormValue={setFormValue}
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
              value={experienceValue[index]?.description}
              onChange={value => setFormValue(`experience.${index}.description`, value)}
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
  );
};
