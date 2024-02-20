import { FC } from 'react';
import styles from './Navbar.module.scss';
import { TPages } from '../../types/TPages.ts';
import Button from '../Button/Button.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';

export const Navbar: FC = () => {
  const location = useLocation();
  const isMainPage = (location.pathname as TPages) === TPages.MAIN;
  const isFormPage = (location.pathname as TPages) === TPages.FORM;
  const isPreviewPage = (location.pathname as TPages) === TPages.PREVIEW;
  const navigate = useNavigate();

  return (
    <section className={cn(styles.Navbar, isMainPage && styles.Navbar_mainPage)}>
      {!isMainPage && <Button onClick={() => navigate(TPages.MAIN)}>Back to Main</Button>}
      <p className={styles.Navbar_text}>Resume Generator</p>
      {isFormPage && <Button onClick={() => navigate(TPages.PREVIEW)}>Go to Preview</Button>}
      {isPreviewPage && <Button onClick={() => navigate(TPages.FORM)}>Edit Resume</Button>}
    </section>
  );
};
