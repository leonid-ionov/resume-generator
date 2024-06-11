import { forwardRef } from 'react';
import styles from './Select.module.scss';
import cn from 'classnames';
import { TFormElement, IIconOption } from '../../types/formTypes.ts';
import { withFormAttributes } from '../WithFormAttributes/WithFormAttributes.tsx';

interface ISelectProps extends TFormElement<HTMLSelectElement> {
  options: IIconOption[];
}

const SelectComponent = forwardRef<HTMLSelectElement, ISelectProps>(
  ({ options, name, placeholder, error, ...overProps }, ref) => {
    return (
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
            aria-selected={overProps.value === option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

const Select = withFormAttributes<HTMLSelectElement, ISelectProps>(SelectComponent);

SelectComponent.displayName = 'Select';
export default Select;
