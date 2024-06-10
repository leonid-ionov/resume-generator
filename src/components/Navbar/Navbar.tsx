import { FC } from 'react';
import styles from './Navbar.module.scss';
import { TPages } from '../../types/TPages.ts';
import Button from '../Button/Button.tsx';
import { useLocation, useNavigate } from 'react-router-dom';

export const Navbar: FC = () => {
  const location = useLocation();
  const state = location?.state ? (location.state as { isPreview?: boolean }) : {};
  const isMainPage = (location.pathname as TPages) === TPages.MAIN;
  const isFormPage = (location.pathname as TPages) === TPages.FORM;
  const isPreviewPage = (location.pathname as TPages) === TPages.PREVIEW;
  const navigate = useNavigate();

  return (
    <section className={styles.Navbar}>
      <section className={styles.Navbar_leftSection}>
        {!isMainPage && <Button onClick={() => navigate(TPages.MAIN)}>Back to Main</Button>}
      </section>

      <p className={styles.Navbar_text}>Resume Generator</p>

      <section className={styles.Navbar_rightSection}>
        {isFormPage && <Button onClick={() => navigate(TPages.PREVIEW)}>Go to Preview</Button>}
        {isPreviewPage && !state?.isPreview && <Button onClick={() => navigate(TPages.FORM)}>Edit Resume</Button>}
      </section>
    </section>
  );
};
