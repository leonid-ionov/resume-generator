import { forwardRef, HTMLProps, useRef } from 'react';
import Button from '../Button/Button.tsx';
import { IFormAttributes, IFormData } from '../../types/formTypes.ts';
import { UseFormRegister } from 'react-hook-form';
import { withFormAttributes } from '../WithFormAttributes/WithFormAttributes.tsx';
import cn from 'classnames';
import styles from './Input.module.scss';
import success from '../../assets/icons/success.svg';
import unavailable from '../../assets/icons/unavailable.svg';

interface IFileInputProps extends HTMLProps<HTMLInputElement>, IFormAttributes {
  registerProps?: ReturnType<UseFormRegister<IFormData>>;
  handleFileUpload?: (file?: File) => void;
  isFileSelected?: boolean;
  fileLabel: string;
}

const FileInputComponent = forwardRef<HTMLInputElement, IFileInputProps>(
  ({ registerProps, fileLabel, error, isFileSelected, handleFileUpload, ...overProps }, ref) => {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    return (
      <>
        <Button onClick={() => hiddenFileInput.current?.click()}>
          <section className={styles.inputControl_file}>
            <p>{fileLabel}</p>
            {hiddenFileInput.current?.files?.[0]?.name || isFileSelected ? (
              <img src={success} alt="file successfully uploaded" />
            ) : (
              <img src={unavailable} alt="file is unavailable" />
            )}
          </section>
        </Button>
        <input
          type="file"
          id={overProps.name}
          name={overProps.name}
          className={cn(styles.inputControl, error && styles.inputControl_error)}
          ref={ref ?? hiddenFileInput}
          {...overProps}
          {...registerProps}
          onChange={async event => {
            const fileUploaded = event.target.files?.[0];
            if (handleFileUpload) handleFileUpload(fileUploaded);
            if (registerProps?.onChange) await registerProps.onChange(event);
          }}
        />
      </>
    );
  }
);

const FileInput = withFormAttributes<HTMLInputElement, IFileInputProps>(FileInputComponent);

FileInputComponent.displayName = 'FileInput';
export default FileInput;
