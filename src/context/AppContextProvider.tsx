import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { AppContext, IAppContext } from './AppContext.tsx';
import { TResumeData } from '../types/TResumeData.ts';

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [resumeData, setResumeData] = useState<TResumeData>();
  const appContext = useMemo<IAppContext>(
    () => ({
      resumeData,
      publishResume: data => {
        setResumeData(prevState => ({ ...prevState, ...data }));
      },
    }),
    [setResumeData, resumeData]
  );
  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
