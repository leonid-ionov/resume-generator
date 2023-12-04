import styles from './SectionTitle.module.scss';
import { Divider } from '../Divider/Divider.tsx';
import { FC } from 'react';

interface ISectionTitle {
  title: string;
}

export const SectionTitle: FC<ISectionTitle> = ({ title }) => (
  <div className={styles.SectionTitle}>
    <h4 className={styles.SectionTitle_title}>{title}</h4>
    <Divider />
  </div>
);
