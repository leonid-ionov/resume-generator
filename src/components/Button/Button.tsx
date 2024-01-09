import { FC, PropsWithChildren } from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';

interface IButtonProps extends PropsWithChildren {
  onClick?: () => void;
  small?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<IButtonProps> = ({ small, type, onClick, children }) => (
  <button className={cn(styles.Button, { [styles.Button_small]: small })} type={type ?? 'button'} onClick={onClick}>
    {children}
  </button>
);

export default Button;
