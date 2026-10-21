import { FC, useRef } from 'react';
import useAppContext from '../../context/useAppContext.tsx';
import { useSearchParams } from 'next/navigation';
import { resumePreviewData } from '../../constants/resumePreviewData.tsx';
import ResumeTemplate from '../../features/ResumeTemplate/ResumeTemplate.tsx';
import Button from '../../components/Button/Button.tsx';
import { jsPDF } from 'jspdf';
import styles from './ResumePreviewPage.module.scss';

// Each script registers a font with jsPDF on load; jsPDF applies them when a new document is created
const loadPdfFonts = () =>
  Promise.all([
    import('../../../scripts/Montserrat-Regular.js'),
    import('../../../scripts/Montserrat-Medium.js'),
    import('../../../scripts/Montserrat-SemiBold.js'),
    import('../../../scripts/Montserrat-LightItalic.js'),
    import('../../../scripts/OpenSans-Regular.js'),
    import('../../../scripts/OpenSans-Bold.js'),
    import('../../../scripts/OpenSans-Italic.js'),
  ]);

export const ResumePreviewPage: FC = () => {
  const searchParams = useSearchParams();
  const appContext = useAppContext();
  const isPreview = searchParams.get('preview') === 'true';
  const resumeData = isPreview ? resumePreviewData : { ...resumePreviewData, ...appContext.resumeData };
  const templateRef = useRef<HTMLDivElement>(null);

  const handleSaveAsPDF = async () => {
    const content = templateRef.current;
    if (!content) return;
    const styleElem = document.createElement('style');
    try {
      await loadPdfFonts();
      const pdf = new jsPDF('p', 'pt', 'a4');
      pdf.internal.pageSize.width = 1224.1;
      pdf.internal.pageSize.height = 1720.1;
      pdf.internal.scaleFactor = 1;
      styleElem.innerHTML = 'li[data-id="list-item"]::before { margin-top: 6px; } img[data-id="icon"] { top: 4px; }';
      document.head.appendChild(styleElem);
      await pdf.html(content, {
        callback: doc => {
          void doc.save(`${resumeData.userName} ${resumeData.desiredJob} CV.pdf`, { returnPromise: true });
        },
      });
    } catch (error) {
      console.error('Error when save resume as pdf:', error);
    } finally {
      styleElem.remove();
    }
  };

  return (
    <section className={styles.previewPage}>
      {!isPreview && (
        <section className={styles.previewPage_title}>
          <h2>Resume Preview</h2> <Button onClick={handleSaveAsPDF}>Save as PDF</Button>
        </section>
      )}
      <ResumeTemplate resumeData={resumeData} ref={templateRef} />
    </section>
  );
};
