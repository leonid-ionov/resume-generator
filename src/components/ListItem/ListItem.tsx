import { FC, PropsWithChildren } from 'react';
import styles from './ListItem.module.scss';
import cn from 'classnames';

interface IListItemProps extends PropsWithChildren {
  name: string;
  timePeriod: string;
  secondName: string;
}

export const ListItem: FC<IListItemProps> = ({ name, secondName, timePeriod, children }) => (
  <li className={styles.ListItem} data-id="list-item">
    <section className={styles.ListItem_content}>
      <div className={styles.ListItem_title}>
        <p className={cn(styles.ListItem_text, styles.ListItem_text__bold)}>{name}</p>
        <p className={cn(styles.ListItem_text, styles.ListItem_text__bold)}>{timePeriod}</p>
      </div>
      <p className={styles.ListItem_text}>{secondName}</p>
      {children}
    </section>
  </li>
);
