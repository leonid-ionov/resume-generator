import { createContext } from 'react';
import { TResumeData } from '../types/TResumeData.ts';

export interface IAppContext {
  resumeData?: TResumeData;
  publishResume: (data: TResumeData) => void;
}

const stubFunction = () => {
  /* stub function*/
};

const initialAppContext: IAppContext = {
  publishResume: stubFunction,
};

export const AppContext = createContext<IAppContext>(initialAppContext);
