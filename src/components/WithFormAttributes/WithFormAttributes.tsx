import { ForwardRefExoticComponent, forwardRef, RefAttributes } from 'react';
import styles from './WithFormAttributes.module.scss';
import { IFormAttributes } from '../../types/formTypes.ts';

export const withFormAttributes = <T extends HTMLElement, P extends IFormAttributes & { name: string }>(
  WrappedComponent: ForwardRefExoticComponent<Omit<P, 'ref'> & RefAttributes<T>>
) => {
  // eslint-disable-next-line react/display-name
  return forwardRef<T, P>((props, ref) => {
    const { label, description, ...rest } = props;
    return (
      <div className={styles.controlContainer}>
        {label && (
          <label className={styles.controlLabel} htmlFor={rest.name}>
            {label}
          </label>
        )}
        <WrappedComponent {...(rest as P)} ref={ref} />
        {(description || rest.error) && (
          <small className={rest.error ? styles.controlErrorText : styles.controlHelperText}>
            {rest.error ? rest.error.message : description}
          </small>
        )}
      </div>
    );
  });
};
