import { FC } from 'react';
import styles from './Navbar.module.scss';
import { TPages } from '../../types/TPages.ts';
import Button from '../Button/Button.tsx';
import { useLocation, useNavigate } from 'react-router-dom';

export const Navbar: FC = () => {
  const location = useLocation();
  const isMainPage = (location.pathname as TPages) === TPages.MAIN;
  const isFormPage = (location.pathname as TPages) === TPages.FORM;
  const navigate = useNavigate();
  const formName = isMainPage ? 'Create New Resume' : 'Edit Resume';

  return (
    <div className={styles.Navbar}>
      {!isMainPage && <Button onClick={() => navigate(TPages.MAIN)}>Back to Main</Button>}
      {!isFormPage && <Button onClick={() => navigate(TPages.FORM)}>{formName}</Button>}
      <Button onClick={() => navigate(TPages.PREVIEW, { state: { isPreview: isMainPage } })}>See Preview</Button>
    </div>
  );
};
