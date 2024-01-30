import { createContext } from 'react';
import { TResumeData } from '../types/TResumeData.ts';
import { IFormData } from '../types/formTypes.ts';
import { initialFormData } from '../constants/formConstants.ts';

export interface IAppContext {
  formData: IFormData;
  resumeData?: TResumeData;
  isLoadSavedFormData?: boolean;
  submitResume: (data: IFormData) => Promise<void>;
  loadSavedFormData: (data: IFormData) => void;
}

const initialAppContext: IAppContext = {
  formData: initialFormData,
  submitResume: async () => {
    /* stub function*/
  },
  loadSavedFormData: () => {
    /* stub function*/
  },
};

export const AppContext = createContext<IAppContext>(initialAppContext);
