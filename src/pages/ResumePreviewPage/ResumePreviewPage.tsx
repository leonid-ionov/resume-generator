import { FC, useRef } from 'react';
import useAppContext from '../../context/useAppContext.tsx';
import { useLocation } from 'react-router-dom';
import { hiddenText, resumePreviewData } from '../../constants/resumePreviewData.tsx';
import ResumeTemplate from '../../features/ResumeTemplate/ResumeTemplate.tsx';
import Button from '../../components/Button/Button.tsx';
import { jsPDF } from 'jspdf';
import styles from './ResumePreviewPage.module.scss';

export const ResumePreviewPage: FC = () => {
  const location = useLocation();
  const appContext = useAppContext();
  const state = location?.state ? (location.state as { isPreview?: boolean }) : {};
  const resumeData = state?.isPreview ? resumePreviewData : { ...resumePreviewData, ...appContext.resumeData };
  const templateRef = useRef<HTMLDivElement>(null);
  const handleSaveAsPDF = async () => {
    const content = templateRef.current;
    if (!content) return;
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.internal.pageSize.width = 1224.1;
    pdf.internal.pageSize.height = 1720.1;
    pdf.internal.scaleFactor = 1;
    try {
      const styleElem = document.head.appendChild(document.createElement('style'));
      styleElem.innerHTML = 'li[data-id="list-item"]::before { margin-top: 6px; } img[data-id="icon"] { top: 4px; }';
      const hiddenDiv = document.getElementById('hidden-text');
      if (hiddenDiv) hiddenDiv.innerHTML = hiddenText;
      await pdf.html(content, {
        callback: doc => {
          void doc.save(`${resumeData.userName} ${resumeData.desiredJob} CV.pdf`, { returnPromise: true });
        },
      });
      document.head.removeChild(styleElem);
    } catch (error) {
      console.error('Error when save resume as pdf:', error);
    }
  };

  return (
    <section className={styles.previewPage}>
      <section className={styles.previewPage_title}>
        <h2>Resume Preview</h2> <Button onClick={handleSaveAsPDF}>Save as PDF</Button>
      </section>
      <ResumeTemplate resumeData={resumeData} ref={templateRef} />
    </section>
  );
};
