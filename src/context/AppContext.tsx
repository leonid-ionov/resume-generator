import { createContext } from 'react';
import { TResumeData } from '../types/TResumeData.ts';
import { IFormData } from '../types/formTypes.ts';
import { initialFormData } from '../constants/formConstants.ts';

export interface IAppContext {
  formData: IFormData;
  resumeData?: TResumeData;
  submitResume: (data: IFormData) => void;
}

const stubFunction = () => {
  /* stub function*/
};

const initialAppContext: IAppContext = {
  formData: initialFormData,
  submitResume: stubFunction,
};

export const AppContext = createContext<IAppContext>(initialAppContext);
