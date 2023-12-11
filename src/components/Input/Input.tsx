import { forwardRef } from 'react';
import styles from './Input.module.scss';
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';

interface IInputProps extends ReturnType<UseFormRegister<FieldValues>> {
  label: string;
  description?: string;
  placeholder?: string;
  error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, name, description, placeholder, error, ...overProps }, ref) => {
    return (
      <div className={styles.inputContainer}>
        <label htmlFor={name}>{label}</label>
        <input
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          className={error ? styles.inputError : ''}
          {...overProps}
          ref={ref}
        />
        {(description || error) && (
          <small className={error ? styles.errorText : styles.helperText}>{error ? error.message : description}</small>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
