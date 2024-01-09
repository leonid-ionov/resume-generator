import { FC, Fragment } from 'react';
import { SectionTitle } from '../../../../components/SectionTitle/SectionTitle.tsx';
import styles from './SkillsSection.module.scss';
import { ISkillDetails, IUserSkill } from '../../../../types/TResumeData.ts';

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
      {details.map((item, index) => (
        <Fragment key={index}>
          {item.variant && <p className={styles.SkillItem_description}>{item.variant}</p>}
          <SkillLevel level={item.level} />
        </Fragment>
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
