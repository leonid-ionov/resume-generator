import { TResumeData } from './TResumeData.ts';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { HTMLProps } from 'react';

type TIcon = 'email' | 'phone' | 'github' | 'instagram' | 'linkedin' | 'website' | 'facebook' | 'Select icon';

interface IIconOption {
  value: TIcon;
  label: string;
}

interface IFormData extends Omit<TResumeData, 'contacts'> {
  contacts: {
    icon: TIcon;
    info: string;
  }[];
}

type TFormElement<T extends HTMLElement> = ReturnType<UseFormRegister<IFormData>> &
  Omit<HTMLProps<T>, 'name' | 'onBlur' | 'onChange' | 'ref'> & {
    label?: string;
    description?: string;
    error?: FieldError;
  };

export type { TFormElement, TIcon, IIconOption, IFormData };
