import { createContext } from 'react';
import { TPages } from '../types/TPages.ts';

export interface IAppContext {
  page: TPages;
  navigate: (page: TPages) => void;
  resumeData: object;
}

const stubFunction = () => {
  /* stub function*/
};

const initialAppContext: IAppContext = {
  page: TPages.MAIN,
  navigate: stubFunction,
  resumeData: {},
};

export const AppContext = createContext<IAppContext>(initialAppContext);
