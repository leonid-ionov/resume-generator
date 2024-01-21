import { FC, PropsWithChildren } from 'react';
import styles from './ListWithTitle.module.scss';
import { SectionTitle } from '../SectionTitle/SectionTitle.tsx';

interface IListProps extends PropsWithChildren {
  title: string;
}

export const ListWithTitle: FC<IListProps> = ({ title, children }) => (
  <section className={styles.List}>
    <SectionTitle title={title} />
    <ul className={styles.List_unordered}>{children}</ul>
  </section>
);
