import { FC, useContext } from 'react';
import styles from './Navbar.module.scss';
import { AppContext } from '../../context/AppContext.tsx';
import { TPages } from '../../types/TPages.ts';
import Button from '../Button/Button.tsx';

export const Navbar: FC = () => {
  const { page, navigate } = useContext(AppContext);

  return (
    <div className={styles.Navbar}>
      {page !== TPages.MAIN && <Button onClick={() => navigate(TPages.MAIN)}>Back to Main</Button>}
      <Button onClick={() => navigate(TPages.FORM)}>Create New Resume</Button>
      <Button onClick={() => navigate(TPages.PREVIEW)}>See Preview</Button>
    </div>
  );
};
