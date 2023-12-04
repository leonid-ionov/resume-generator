import styles from './ExperienceSection.module.scss';
import { FC, ReactNode } from 'react';
import { SectionTitle } from '../../../../components/SectionTitle/SectionTitle.tsx';

export interface IPositionExplore {
  positionName: string;
  companyName: string;
  workingPeriod: string;
  description: ReactNode;
}

const PositionItem: FC<IPositionExplore> = ({ positionName, workingPeriod, companyName, description }) => (
  <li>
    <section className={styles.PositionItem}>
      <div className={styles.PositionItem_title}>
        <div>
          <h5>{positionName}</h5>
          <span>{companyName}</span>
        </div>
        <span>{workingPeriod}</span>
      </div>
      <p>{description}</p>
    </section>
  </li>
);

interface IExperienceSection {
  experience: IPositionExplore[];
}

export const ExperienceSection: FC<IExperienceSection> = ({ experience }) => {
  return (
    <section className={styles.ExperienceSection}>
      <SectionTitle title="Work" />
      <ul>
        {experience.map(item => (
          <PositionItem {...item} key={item.workingPeriod} />
        ))}
      </ul>
    </section>
  );
};
