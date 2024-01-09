import { FC } from 'react';
import useAppContext from '../../context/useAppContext.tsx';
import { useLocation } from 'react-router-dom';
import { resumePreviewData } from '../../constants/resumePreviewData.tsx';
import { ResumeTemplate } from '../../features/ResumeTemplate/ResumeTemplate.tsx';

export const ResumePreview: FC = () => {
  const location = useLocation();
  const appContext = useAppContext();
  const state = location.state as { isPreview?: boolean };
  const resumeData = state.isPreview ? resumePreviewData : { ...resumePreviewData, ...appContext.resumeData };

  return <ResumeTemplate resumeData={resumeData} />;
};
