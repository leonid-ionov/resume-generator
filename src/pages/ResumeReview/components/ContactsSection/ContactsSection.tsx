import { FC } from 'react';
import styles from './ContactsSection.module.scss';

/*interface IContactElement {
  info: string;
  icon: ReactNode;
}

const ContactElement: FC<IContactElement> = ({ info, icon }) => (
  <div className={styles.ContactElement}>
    <p className={styles.ContactElement_info}>{info}</p>
    <div className={styles.ContactElement_icon}>{icon}</div>
  </div>
);*/

export const ContactsSection: FC = () => (
  <div className={styles.ContactsSection}>
    <div className={styles.ContactElement}>
      <p className={styles.ContactElement_info}>CALL +995 59117 80 45</p>
      <div className={styles.ContactElement_icon}>some icon</div>
    </div>
    <div className={styles.ContactElement}>
      <p className={styles.ContactElement_info}>leonid8ionov@gmail.com</p>
      <div className={styles.ContactElement_icon}>some icon</div>
    </div>
  </div>
);
