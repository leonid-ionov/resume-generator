import { forwardRef } from 'react';
import styles from './Input.module.scss';
import cn from 'classnames';
import { TFormElement } from '../../types/formTypes.ts';
import { withFormAttributes } from '../WithFormAttributes/WithFormAttributes.tsx';

type TInputProps = TFormElement<HTMLInputElement>;

const InputComponent = forwardRef<HTMLInputElement, TInputProps>(({ name, error, ...overProps }, ref) => {
  return (
    <input
      type="text"
      id={name}
      name={name}
      className={cn(styles.inputControl, error && styles.inputControl_error)}
      {...overProps}
      ref={ref}
    />
  );
});

const Input = withFormAttributes<HTMLInputElement, TInputProps>(InputComponent);

InputComponent.displayName = 'Input';
export default Input;
