import { useContext } from 'react';
import { AppContext, IAppContext } from './AppContext.tsx';

const useAppContext = (): IAppContext => {
  return useContext(AppContext);
};

export default useAppContext;
