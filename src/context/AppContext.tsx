import { createContext } from 'react';
import { TPages } from '../types/TPages.ts';

export interface IResumeData {
  userName: string;
}

export interface IAppContext {
  page: TPages;
  navigate: (page: TPages) => void;
  resumeData?: IResumeData;
  publishResume: (data: IResumeData) => void;
}

const stubFunction = () => {
  /* stub function*/
};

const initialAppContext: IAppContext = {
  page: TPages.MAIN,
  navigate: stubFunction,
  publishResume: stubFunction,
};

export const AppContext = createContext<IAppContext>(initialAppContext);
