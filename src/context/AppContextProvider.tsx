import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { AppContext, IAppContext } from './AppContext.tsx';
import { TResumeData } from '../pages/ResumeReview/ResumePreview.tsx';

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [resumeData, setResumeData] = useState<TResumeData>();
  const appContext = useMemo<IAppContext>(
    () => ({
      resumeData,
      publishResume: data => setResumeData(prevState => ({ ...prevState, ...data })),
    }),
    [resumeData, setResumeData]
  );
  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
