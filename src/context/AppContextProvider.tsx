import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { AppContext, IAppContext, IResumeData } from './AppContext.tsx';
import { TPages } from '../types/TPages.ts';

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [page, setPage] = useState(TPages.MAIN);
  const [resumeData, setResumeData] = useState<IResumeData>();
  const appContext = useMemo<IAppContext>(
    () => ({
      page,
      navigate: (page: TPages) => setPage(page),
      resumeData,
      publishResume: data => setResumeData(prevState => ({ ...prevState, ...data })),
    }),
    [page, resumeData, setResumeData, setPage]
  );
  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
