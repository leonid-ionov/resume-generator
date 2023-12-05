import { FC } from 'react';
import styles from './InfoSection.module.scss';
import { SectionTitle } from '../../../../components/SectionTitle/SectionTitle.tsx';
import cn from 'classnames';

type TInfoTypes = 'dayOfBirth' | 'city' | 'languages';
export interface IInfoItem {
  type: TInfoTypes;
  value: string;
}

const userInfoTitlesMap: Record<TInfoTypes, string> = {
  dayOfBirth: 'Date of Birth',
  city: 'City',
  languages: 'Languages',
};

const InfoItem: FC<IInfoItem> = ({ type, value }) => (
  <div className={styles.InfoItem}>
    <p className={cn(styles.InfoItem_text, styles.InfoItem_text__bold)}>{userInfoTitlesMap[type]}</p>
    <p className={styles.InfoItem_text}>{value}</p>
  </div>
);

interface IUserInfo {
  userInfo: IInfoItem[];
}

export const InfoSection: FC<IUserInfo> = ({ userInfo }) => {
  return (
    <section className={styles.InfoSection}>
      <SectionTitle title="info" />
      <section className={styles.InfoSection_items}>
        {userInfo.map(item => (
          <InfoItem key={item.type} {...item} />
        ))}
      </section>
    </section>
  );
};
