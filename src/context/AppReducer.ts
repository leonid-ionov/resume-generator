import { TResumeData } from '../types/TResumeData.ts';
import { IFormData } from '../types/formTypes.ts';
import { IconsOptions } from '../constants/formConstants.ts';

export enum AppActionTypes {
  SUBMIT_FORM_DATA = 'SUBMIT_FORM_DATA',
  LOAD_SAVED_FORM_DATA = 'LOAD_SAVED_FORM_DATA',
}

type AppAction =
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

// Saved files keep the icon URL of the build that wrote them (Vite: email-[hash].svg, Next: email.[hash].svg),
// so map it back to the current build by icon name
const normalizeContactIcon: (iconUrl: string) => string = iconUrl => {
  const iconName = iconUrl.match(/\/([a-z]+)(?:[.-][^/]*)?\.svg$/i)?.[1]?.toLowerCase();
  if (!iconName) return iconUrl;
  const iconOption = IconsOptions.find(option => option.label.toLowerCase().replace(' ', '') === iconName);
  return iconOption ? iconOption.value : iconUrl;
};

export const appReducer = (state: IAppState, action: AppAction): IAppState => {
  switch (action.type) {
    case AppActionTypes.SUBMIT_FORM_DATA:
      return {
        formData: action.payload.formData,
        resumeData: action.payload.resumeData,
      };
    case AppActionTypes.LOAD_SAVED_FORM_DATA:
      return {
        ...state,
        isFormDataLoaded: true,
        formData: {
          ...action.payload,
          contacts: action.payload.contacts.map(({ info, icon }) => ({ info, icon: normalizeContactIcon(icon) })),
        },
      };
    default:
      return state;
  }
};
