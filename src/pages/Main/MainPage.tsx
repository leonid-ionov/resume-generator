import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { TPages } from '../../types/TPages.ts';
import Button from '../../components/Button/Button.tsx';
import styles from './MainPage.module.scss';

export const MainPage: FC = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.mainPage}>
      <h2>Welcome to Resume Generator</h2>
      <p>Your tool for instant, professional resume creation!</p>

      <p>
        <strong>About the App:</strong> Resume Builder - a user-friendly web app built with React and TypeScript. Fill
        out the form and get a template-based stylish resume instantly.
      </p>

      <p>
        <strong>Key Features:</strong>
      </p>
      <ul>
        <li>
          <strong>Resume Creation:</strong> Fill out the form, get a resume with just one click.
        </li>
        <li>
          <strong>Manual Save:</strong> Save the form data and continue editing or add new experience.
        </li>
        <li>
          <strong>Export to PDF:</strong> Export your finished resume to PDF.
        </li>
      </ul>

      <p>
        <strong>Two Steps:</strong>
      </p>
      <ol>
        <li>
          <Button onClick={() => navigate(TPages.PREVIEW, { state: { isPreview: true } })}>See Preview</Button> Review
          your resume before saving.
        </li>
        <li>
          <Button onClick={() => navigate(TPages.FORM)}>Go to form</Button> Create a new resume or update an existing
          one.
        </li>
      </ol>

      <p>Start building your career with Resume Builder. Create your resume now!</p>
    </section>
  );
};
