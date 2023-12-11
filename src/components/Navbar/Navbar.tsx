import { FC } from 'react';
import styles from './Navbar.module.scss';
import { TPages } from '../../types/TPages.ts';
import Button from '../Button/Button.tsx';
import { useLocation, useNavigate } from 'react-router-dom';

export const Navbar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.Navbar}>
      {(location.pathname as TPages) !== TPages.MAIN && (
        <Button onClick={() => navigate(TPages.MAIN)}>Back to Main</Button>
      )}
      <Button onClick={() => navigate(TPages.FORM)}>Create New Resume</Button>
      <Button onClick={() => navigate(TPages.PREVIEW)}>See Preview</Button>
    </div>
  );
};
