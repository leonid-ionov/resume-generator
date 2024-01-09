import styles from './ExperienceSection.module.scss';
import { FC } from 'react';
import { ListItem } from '../../../../components/ListItem/ListItem.tsx';
import { ListWithTitle } from '../../../../components/List/ListWithTitle.tsx';
import { IPositionExplore } from '../../../../types/TResumeData.ts';

interface IExperienceSection {
  experience: IPositionExplore[];
}

export const ExperienceSection: FC<IExperienceSection> = ({ experience }) => {
  return (
    <ListWithTitle title="Work">
      {experience.map(item => (
        <ListItem
          key={item.workingPeriod}
          name={item.positionName}
          timePeriod={item.workingPeriod}
          secondName={item.companyName}
        >
          <p className={styles.Experience_description}>{item.description}</p>
        </ListItem>
      ))}
    </ListWithTitle>
  );
};
