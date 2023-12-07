import { FC, PropsWithChildren } from 'react';
import styles from './Button.module.scss';

interface IButtonProps extends PropsWithChildren {
  onClick?: () => void;
}

export const Button: FC<IButtonProps> = ({ onClick, children }) => (
  <button className={styles.Button} onClick={onClick}>
    {children}
  </button>
);
