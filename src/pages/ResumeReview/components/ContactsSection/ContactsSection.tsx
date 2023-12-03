import { FC, ReactNode } from 'react';
import styles from './ContactsSection.module.scss';

export interface IContactElement {
  info: string;
  icon: ReactNode;
}

const ContactElement: FC<IContactElement> = ({ info, icon }) => (
  <article className={styles.ContactElement}>
    <p className={styles.ContactElement_info}>{info}</p>
    <figure className={styles.ContactElement_icon}>{icon}</figure>
  </article>
);

export interface IContactsSection {
  contacts: IContactElement[];
}

export const ContactsSection: FC<IContactsSection> = ({ contacts }) => (
  <section className={styles.ContactsSection}>
    {contacts.map(element => (
      <ContactElement key={element.info} info={element.info} icon={element.icon} />
    ))}
  </section>
);
