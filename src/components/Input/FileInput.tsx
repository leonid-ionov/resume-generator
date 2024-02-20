import { forwardRef, HTMLProps, useRef } from 'react';
import Button from '../Button/Button.tsx';
import { IFormAttributes, IFormData } from '../../types/formTypes.ts';
import { UseFormRegister } from 'react-hook-form';
import { withFormAttributes } from '../WithFormAttributes/WithFormAttributes.tsx';
import cn from 'classnames';
import styles from './Input.module.scss';

interface IFileInputProps extends HTMLProps<HTMLInputElement>, IFormAttributes {
  registerProps?: ReturnType<UseFormRegister<IFormData>>;
  onFileUploaded?: (file?: File) => void;
  fileLabel: string;
}

const FileInputComponent = forwardRef<HTMLInputElement, IFileInputProps>(
  ({ registerProps, fileLabel, error, ...overProps }, ref) => {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    return (
      <>
        <Button onClick={() => hiddenFileInput.current?.click()}>{fileLabel}</Button>
        <input
          type="file"
          id={overProps.name}
          name={overProps.name}
          className={cn(styles.inputControl, error && styles.inputControl_error)}
          {...overProps}
          {...registerProps}
          onChange={async event => {
            const fileUploaded = event.target.files?.[0];
            if (overProps?.onFileUploaded) overProps.onFileUploaded(fileUploaded);
            if (registerProps?.onChange) await registerProps.onChange(event);
          }}
          ref={ref ?? hiddenFileInput}
        />
      </>
    );
  }
);

const FileInput = withFormAttributes<HTMLInputElement, IFileInputProps>(FileInputComponent);

FileInputComponent.displayName = 'FileInput';
export default FileInput;
