// InputComponent.js
import { FC, useRef, useState } from 'react';
import styles from './Input.module.scss';

interface IInputProps {
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  maxValue?: number;
  defaultValue?: string;
  onChange: (value: string, isValid?: boolean) => void;
}

const Input: FC<IInputProps> = ({ label, description, placeholder, required, maxValue, defaultValue, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = `${label}-input`;
  const [isError, setIsError] = useState<boolean>(false);
  const handleChange = () => {
    if (inputRef.current) {
      onChange(inputRef.current.value);
    }
  };

  const handleBlur = () => {
    if (inputRef.current) {
      const isValid = inputRef.current.checkValidity();
      if (maxValue && inputRef.current.value.length > maxValue) {
        setIsError(true);
        inputRef.current.setCustomValidity('too big');
      } else {
        setIsError(false);
        inputRef.current.setCustomValidity('');
        inputRef.current.reportValidity();
      }
      if (!isValid) setIsError(!isValid);
      console.log(isValid);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={inputId}>{label}</label>
      <input
        type="text"
        id={inputId}
        ref={inputRef}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        className={inputRef.current?.validationMessage ? styles.inputError : ''}
      />
      {(description || isError) && (
        <small className={isError ? styles.errorText : styles.helperText}>
          {isError ? inputRef.current?.validationMessage : description}
        </small>
      )}
    </div>
  );
};

export default Input;
