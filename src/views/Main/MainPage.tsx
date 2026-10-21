import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { TPages } from '../../types/TPages.ts';
import styles from './MainPage.module.scss';
import formPreview from '../../assets/images/formPreview.png';
import resumePreview from '../../assets/images/resumePreview.png';

const features = [
  { title: 'Resume Creation', text: 'Fill out the form, get a resume with just one click.' },
  { title: 'Manual Save', text: 'Save the form data and continue editing or add new experience.' },
  { title: 'Export to PDF', text: 'Export your finished resume to PDF.' },
];

export const MainPage: FC = () => (
  <section className={styles.mainPage}>
    <header className={styles.hero}>
      <h1>Welcome to Resume Generator</h1>
      <p>Your tool for quick and easy CV creation!</p>
    </header>

    <div className={styles.actions}>
      <Link className={styles.card} href={`${TPages.PREVIEW}?preview=true`}>
        <img className={styles.card_image} src={resumePreview} alt="" />
        <h2>See preview</h2>
        <p>Review how CV will look like before you start creating yours</p>
        <span className={styles.card_cta}>Open preview →</span>
      </Link>
      <Link className={cn(styles.card, styles.card__primary)} href={TPages.FORM}>
        <img className={styles.card_image} src={formPreview} alt="" />
        <h2>Go to form</h2>
        <p>Create a new resume or update an existing one</p>
        <span className={styles.card_cta}>Start editing →</span>
      </Link>
    </div>

    <section className={styles.about}>
      <h2>About the App</h2>
      <p>
        Resume Generator - a user-friendly web app built with React and TypeScript. Fill out the form and get a
        template-based stylish resume instantly.
      </p>
      <ul className={styles.features}>
        {features.map(({ title, text }) => (
          <li key={title}>
            <strong>{title}</strong>
            <span>{text}</span>
          </li>
        ))}
      </ul>
      <p>Start building your career with Resume Generator. Create your resume now!</p>
    </section>
  </section>
);
