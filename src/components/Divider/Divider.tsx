import { FC } from 'react';
import cn from 'classnames';
import styles from './Divider.module.scss';

interface IDividerProps {
  large?: boolean;
  white?: boolean;
}

export const Divider: FC<IDividerProps> = ({ large, white }) => {
  const className = cn(styles.Divider, {
    [styles.Divider__white]: white,
    [styles.Divider__large]: large,
  });

  return <hr className={className} />;
};
