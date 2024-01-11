import { forwardRef } from 'react';
import styles from './TextArea.module.scss';
import cn from 'classnames';
import { TFormElement } from '../../types/formTypes.ts';
import { withFormAttributes } from '../WithFormAttributes/WithFormAttributes.tsx';

type TTextAreaProps = TFormElement<HTMLTextAreaElement>;

const TextAreaComponent = forwardRef<HTMLTextAreaElement, TTextAreaProps>(({ name, error, ...overProps }, ref) => {
  return (
    <textarea
      id={name}
      name={name}
      className={cn(styles.textareaControl, error && styles.textareaControl_error)}
      {...overProps}
      ref={ref}
    />
  );
});

const TextArea = withFormAttributes<HTMLTextAreaElement, TTextAreaProps>(TextAreaComponent);

TextAreaComponent.displayName = 'TextArea';
export default TextArea;
