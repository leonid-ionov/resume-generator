import { createContext } from 'react';

export interface IResumeData {
  userName: string;
}

export interface IAppContext {
  resumeData?: IResumeData;
  publishResume: (data: IResumeData) => void;
}

const stubFunction = () => {
  /* stub function*/
};

const initialAppContext: IAppContext = {
  publishResume: stubFunction,
};

export const AppContext = createContext<IAppContext>(initialAppContext);
