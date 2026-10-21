'use client';
import { FC } from 'react';
import styles from './Navbar.module.scss';
import { TPages } from '../../types/TPages.ts';
import Button from '../Button/Button.tsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const Navbar: FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  const isMainPage = (pathname as TPages) === TPages.MAIN;
  const isFormPage = (pathname as TPages) === TPages.FORM;
  const isPreviewPage = (pathname as TPages) === TPages.PREVIEW;
  const router = useRouter();

  return (
    <section className={styles.Navbar}>
      <section className={styles.Navbar_leftSection}>
        {!isMainPage && <Button onClick={() => router.push(TPages.MAIN)}>Back to Main</Button>}
      </section>

      <p className={styles.Navbar_text}>Resume Generator</p>

      <section className={styles.Navbar_rightSection}>
        {isFormPage && <Button onClick={() => router.push(TPages.PREVIEW)}>Go to Preview</Button>}
        {isPreviewPage && !isPreview && <Button onClick={() => router.push(TPages.FORM)}>Edit Resume</Button>}
      </section>
    </section>
  );
};
