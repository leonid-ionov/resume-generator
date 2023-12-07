import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { AppContext, IAppContext } from './AppContext.tsx';
import { TPages } from '../types/TPages.ts';

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [page, setPage] = useState(TPages.MAIN);
  console.log(page);
  const appContext = useMemo<IAppContext>(
    () => ({
      page,
      navigate: (page: TPages) => setPage(page),
      resumeData: {},
    }),
    [page]
  );

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
