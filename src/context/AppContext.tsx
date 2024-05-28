import { createContext } from 'react';
import { IFormData } from '../types/formTypes.ts';
import { initialFormData } from '../constants/formConstants.ts';
import { IAppState } from './AppReducer.ts';
import { TResumeData } from '../types/TResumeData.ts';

export interface IAppContext extends Omit<IAppState, 'resumeData'> {
  resumeData?: TResumeData;
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
