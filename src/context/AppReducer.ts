import { TResumeData } from '../types/TResumeData.ts';
import { IFormData } from '../types/formTypes.ts';
import { Reducer } from 'react';
import { isProdEnv } from '../tests/utils/testHelpers.ts';
import { IconsOptions } from '../constants/formConstants.ts';

export enum AppActionTypes {
  SUBMIT_FORM_DATA = 'SUBMIT_FORM_DATA',
  LOAD_SAVED_FORM_DATA = 'LOAD_SAVED_FORM_DATA',
}

export type AppAction =
  | {
      type: AppActionTypes.SUBMIT_FORM_DATA;
      payload: {
        formData: IFormData;
        resumeData: TResumeData;
      };
    }
  | {
      type: AppActionTypes.LOAD_SAVED_FORM_DATA;
      payload: IFormData;
    };

export interface IAppState {
  resumeData: TResumeData;
  formData: IFormData;
  isFormDataLoaded?: boolean;
}

const normalizeContactIcon: (iconUrl: string) => string = iconUrl => {
  const iconName = iconUrl.match(/\/([^/]+)\.svg$/)?.[1];
  if (!iconName) return iconUrl;
  const iconOption = IconsOptions.find(option => option.label.toLowerCase().replace(' ', '') === iconName);
  return iconOption ? iconOption.value : iconUrl;
};

export const appReducer: Reducer<IAppState, AppAction> = (state, action) => {
  switch (action.type) {
    case AppActionTypes.SUBMIT_FORM_DATA:
      return {
        formData: action.payload.formData,
        resumeData: action.payload.resumeData,
      };
    case AppActionTypes.LOAD_SAVED_FORM_DATA:
      const { contacts } = action.payload;
      const shouldNormalizeContacts = contacts.length > 0 && isProdEnv() && contacts[0].icon.includes('localhost');
      const normalizeContacts = shouldNormalizeContacts
        ? contacts.map(({ info, icon }) => ({ info, icon: normalizeContactIcon(icon) }))
        : null;

      return {
        ...state,
        isFormDataLoaded: true,
        formData: normalizeContacts ? { ...action.payload, contacts: normalizeContacts } : action.payload,
      };
    default:
      return state;
  }
};
