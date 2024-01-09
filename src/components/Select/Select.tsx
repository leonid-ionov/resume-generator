import { forwardRef } from 'react';
import styles from './Select.module.scss';
import { Control, useWatch } from 'react-hook-form';
import cn from 'classnames';
import { IFormData, TFormElement, IIconOption, TIcon } from '../../types/formTypes.ts';

interface ISelectProps extends TFormElement<HTMLSelectElement> {
  options: IIconOption[];
  control: Control<IFormData>;
}

const Select = forwardRef<HTMLSelectElement, ISelectProps>(
  ({ options, label, name, description, placeholder, error, ...overProps }, ref) => {
    const selectValue = useWatch({ name, control: overProps.control, defaultValue: overProps.defaultValue }) as TIcon;
    return (
      <div className={styles.selectContainer}>
        {label && (
          <label className={styles.selectLabel} htmlFor={name}>
            {label}
          </label>
        )}
        <select
          id={name}
          name={name}
          defaultValue={overProps.defaultValue ?? placeholder}
          className={cn(styles.selectControl, error && styles.selectControl_error)}
          {...overProps}
          ref={ref}
        >
          {placeholder && (
            <option value={placeholder} className={styles.selectOption} disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option
              className={styles.selectOption}
              key={option.value}
              value={option.value}
              aria-selected={selectValue === option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        {(description || error) && (
          <small className={error ? styles.selectError : styles.selectHelper}>
            {error ? error.message : description}
          </small>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
