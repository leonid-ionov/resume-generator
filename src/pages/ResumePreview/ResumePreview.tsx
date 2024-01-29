import { FC, useRef } from 'react';
import useAppContext from '../../context/useAppContext.tsx';
import { useLocation } from 'react-router-dom';
import { resumePreviewData } from '../../constants/resumePreviewData.tsx';
import ResumeTemplate from '../../features/ResumeTemplate/ResumeTemplate.tsx';
import Button from '../../components/Button/Button.tsx';
import { jsPDF } from 'jspdf';

export const ResumePreview: FC = () => {
  const location = useLocation();
  const appContext = useAppContext();
  const state = location.state as { isPreview?: boolean };
  const resumeData = state.isPreview ? resumePreviewData : { ...resumePreviewData, ...appContext.resumeData };
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
      await pdf.html(content, {
        callback: pdf => {
          pdf.save('resume.pdf');
        },
      });
      document.head.removeChild(styleElem);
    } catch (error) {
      /* TODO: Implement error handling in the future */
    }
  };

  return (
    <div>
      <ResumeTemplate resumeData={resumeData} ref={templateRef} />
      <Button onClick={handleSaveAsPDF}>Save as PDF</Button>
    </div>
  );
};
