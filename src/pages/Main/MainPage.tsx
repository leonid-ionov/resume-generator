import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { TPages } from '../../types/TPages.ts';
import { GraphicButton } from '../../components/MainPageButton/GraphicButton.tsx';
import styles from './MainPage.module.scss';
import formPreview from '../../assets/images/formPreview.png';
import resumePreview from '../../assets/images/resumePreview.png';
import arrowIcon from '../../assets/icons/arrow.svg';
import cn from 'classnames';

export const MainPage: FC = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.mainPage}>
      <section className={styles.mainPage_textSection}>
        <h2>Welcome to Resume Generator</h2>
        <p>Your tool for tool for quick and easy CV creation!</p>
      </section>

      <section className={styles.mainPage_stepsSection}>
        <GraphicButton
          onClick={() => navigate(TPages.PREVIEW, { state: { isPreview: true } })}
          label="See preview"
          angle="left"
          image={resumePreview}
        />
        <div className={styles.mainPage_stepsSection_description}>
          <div className={styles.text}>
            <img className={styles.icon} src={arrowIcon} alt="left arrow icon" />
            Review how CV will look like before you start creating yours
          </div>
          <div className={styles.text}>
            Create a new resume or update an existing one
            <img className={cn(styles.icon, styles.right)} src={arrowIcon} alt="left arrow icon" />
          </div>
        </div>
        <GraphicButton onClick={() => navigate(TPages.FORM)} label="Go to form" angle="right" image={formPreview} />
      </section>
      <section className={styles.mainPage_textSection}>
        <h3>About the App:</h3>
        <p>
          Resume Generator - a user-friendly web app built with React and TypeScript. Fill out the form and get a
          template-based stylish resume instantly.
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
        <p>Start building your career with Resume Generator. Create your resume now!</p>
      </section>
    </section>
  );
};
