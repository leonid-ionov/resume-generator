import { FC, ReactNode } from 'react';
import { SectionTitle } from '../../../../components/SectionTitle/SectionTitle.tsx';
import styles from './InterestsSection.module.scss';

export interface IUserInterest {
  name: string;
  icon: ReactNode;
}

interface IInterestsSection {
  interests: IUserInterest[];
}

export const InterestsSection: FC<IInterestsSection> = ({ interests }) => (
  <section className={styles.InterestsSection}>
    <SectionTitle title="interests" />
    <section className={styles.InterestsSection_row}>
      {interests.map(item => (
        <div key={item.name} className={styles.InterestsSection_item}>
          <div className={styles.InterestsSection_iconContainer}>{item.icon}</div>
          <p className={styles.InterestsSection_text}>{item.name}</p>
        </div>
      ))}
    </section>
  </section>
);
