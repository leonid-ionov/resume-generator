import { FC } from 'react';
import { ListWithTitle } from '../../../../components/List/ListWithTitle.tsx';
import { ListItem } from '../../../../components/ListItem/ListItem.tsx';
import styles from './EducationSection.module.scss';
import { IUserEducation } from '../../../../types/TResumeData.ts';

interface IEducations {
  educations: IUserEducation[];
}

export const EducationSection: FC<IEducations> = ({ educations }) => (
  <ListWithTitle title="education">
    {educations.map(education => (
      <ListItem
        key={education.educationPeriod}
        name={education.speciality}
        timePeriod={education.educationPeriod}
        secondName={education.institution}
      >
        <p className={styles.Education_description}>{education.description}</p>
      </ListItem>
    ))}
  </ListWithTitle>
);
