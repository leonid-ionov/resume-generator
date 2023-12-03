import { FC, ReactNode } from 'react';
import styles from './ContactsSection.module.scss';

export interface IContactElement {
  info: string;
  icon: ReactNode;
}

const ContactElement: FC<IContactElement> = ({ info, icon }) => (
  <div className={styles.ContactElement}>
    <p className={styles.ContactElement_info}>{info}</p>
    <div className={styles.ContactElement_icon}>{icon}</div>
  </div>
);

export interface IContactsSection {
  contacts: IContactElement[];
}

export const ContactsSection: FC<IContactsSection> = ({ contacts }) => (
  <div className={styles.ContactsSection}>
    {contacts.map(element => (
      <ContactElement key={element.info} info={element.info} icon={element.icon} />
    ))}
  </div>
);
