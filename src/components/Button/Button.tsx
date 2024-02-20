import { FC, PropsWithChildren } from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';

interface IButtonProps extends PropsWithChildren {
  onClick?: () => void;
  small?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: FC<IButtonProps> = ({ small, className, type, onClick, children }) => (
  <button
    className={cn(styles.Button, { [styles.Button_small]: small }, className)}
    type={type ?? 'button'}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
