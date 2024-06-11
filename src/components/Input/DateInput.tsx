/* eslint-disable react/prop-types, @typescript-eslint/no-unsafe-assignment,  @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import { FC } from 'react';
import Datetime, { DatetimepickerProps } from 'react-datetime';
import Input from './Input.tsx';
import { TFormElement } from '../../types/formTypes.ts';

interface IDateInputProps {
  dateTimeProps: Omit<DatetimepickerProps, 'value' | 'onChange | renderInput'> & { momentFormat?: string };
  inputProps: TFormElement<HTMLInputElement>;
  handleChange?: (value: string) => void;
}

export const DateInput: FC<IDateInputProps> = ({ dateTimeProps, inputProps, handleChange }) => {
  return (
    <Datetime
      {...dateTimeProps}
      value={inputProps.value as string}
      onChange={date => {
        const value = typeof date === 'string' ? date : date?.format(dateTimeProps.momentFormat);
        if (handleChange) handleChange(value);
      }}
      renderInput={(props, openCalendar) => {
        return (
          <Input
            {...inputProps}
            onChange={props.onChange}
            value={inputProps.value as string}
            onClick={() => openCalendar()}
            onKeyUp={() => openCalendar()}
          />
        );
      }}
    />
  );
};
