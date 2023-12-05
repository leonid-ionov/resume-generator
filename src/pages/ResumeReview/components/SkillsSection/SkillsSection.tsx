import { FC } from 'react';
import { SectionTitle } from '../../../../components/SectionTitle/SectionTitle.tsx';
import styles from './SkillsSection.module.scss';

interface ISkillDetails {
  variant?: string;
  level: string;
}
export interface IUserSkill {
  name: string;
  details: ISkillDetails[];
}

const SkillLevel: FC<Pick<ISkillDetails, 'level'>> = ({ level }) => {
  const style: Record<string, string> = {
    '--skill-level': level,
  };
  return (
    <div className={styles.SkillLevel}>
      <div className={styles.SkillLevel_fill} style={style} />
    </div>
  );
};

const SkillItem: FC<IUserSkill> = ({ name, details }) => {
  return (
    <article className={styles.SkillItem}>
      <p className={styles.SkillItem_name}>{name}</p>
      {details.map(item => (
        <>
          <p className={styles.SkillItem_description}>{item.variant}</p>
          <SkillLevel level={item.level} />
        </>
      ))}
    </article>
  );
};

interface ISkills {
  skills: IUserSkill[];
}

export const SkillsSection: FC<ISkills> = ({ skills }) => {
  return (
    <section className={styles.SkillsSection}>
      <SectionTitle title="skills" />
      {skills.map(item => (
        <SkillItem key={item.name} {...item} />
      ))}
    </section>
  );
};
