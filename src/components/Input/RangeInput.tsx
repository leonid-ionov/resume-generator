import { forwardRef } from 'react';
import { IFormData, TFormElement } from '../../types/formTypes.ts';
import { Control, useWatch } from 'react-hook-form';
import Input from './Input.tsx';

interface IRangeInputProps extends TFormElement<HTMLInputElement> {
  control: Control<IFormData>;
}

const RangeInput = forwardRef<HTMLInputElement, IRangeInputProps>(({ name, control, ...overProps }, ref) => {
  const rangeInputValue = useWatch({ name, control });
  const style = { ...overProps?.style, '--range-progress': `${String(rangeInputValue)?.replace('%', '')}%` };
  return (
    <Input
      {...overProps}
      ref={element => {
        if (overProps.ref) overProps.ref(element);
        if (ref) {
          if (typeof ref === 'function') ref(element);
          else ref.current = element;
        }
      }}
      type="range"
      name={name}
      style={style}
    />
  );
});

RangeInput.displayName = 'RangeInput';
export default RangeInput;
