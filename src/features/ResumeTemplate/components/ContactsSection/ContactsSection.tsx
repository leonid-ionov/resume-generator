import { FC } from 'react';
import styles from './ContactsSection.module.scss';
import { IContactElement } from '../../../../types/TResumeData.ts';

const ContactElement: FC<IContactElement> = ({ info, icon }) => {
  return (
    <article className={styles.ContactElement}>
      <p className={styles.ContactElement_info}>{info}</p>
      <img data-id="icon" className={styles.ContactElement_icon} src={icon} alt={info} />
    </article>
  );
};

export interface IContactsSection {
  contacts: IContactElement[];
}

export const ContactsSection: FC<IContactsSection> = ({ contacts }) => (
  <section className={styles.ContactsSection}>
    {contacts.map((element, index) => (
      <ContactElement key={element.info || index} info={element.info} icon={element.icon} />
    ))}
  </section>
);
