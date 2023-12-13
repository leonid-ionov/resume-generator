import { createContext } from 'react';
import { TResumeData } from '../pages/ResumeReview/ResumePreview.tsx';

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
