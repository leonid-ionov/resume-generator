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

    const pdf = new jsPDF('p', 'pt', [1224, 1720]);
    pdf.internal.pageSize.width = 1224;
    pdf.internal.pageSize.height = 1720;
    pdf.internal.scaleFactor = 1;
    await pdf.html(content, {
      callback: pdf => {
        pdf.save('example.pdf');
      },
    });
  };

  return (
    <div>
      <ResumeTemplate resumeData={resumeData} ref={templateRef} />
      <Button onClick={handleSaveAsPDF}>Save as PDF</Button>
    </div>
  );
};
