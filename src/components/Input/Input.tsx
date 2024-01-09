import { forwardRef } from 'react';
import styles from './Input.module.scss';
import cn from 'classnames';
import { TFormElement } from '../../types/formTypes.ts';

type TInputProps = TFormElement<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, TInputProps>(({ label, name, description, error, ...overProps }, ref) => {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label className={styles.inputLabel} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        type="text"
        id={name}
        name={name}
        className={cn(styles.inputControl, error && styles.inputControl_error)}
        {...overProps}
        ref={ref}
      />
      {(description || error) && (
        <small className={error ? styles.inputError : styles.inputHelper}>{error ? error.message : description}</small>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
