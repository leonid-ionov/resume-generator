import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { AppContext, IAppContext, IResumeData } from './AppContext.tsx';

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [resumeData, setResumeData] = useState<IResumeData>();
  const appContext = useMemo<IAppContext>(
    () => ({
      resumeData,
      publishResume: data => setResumeData(prevState => ({ ...prevState, ...data })),
    }),
    [resumeData, setResumeData]
  );
  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
