import { FC, PropsWithChildren, useCallback, useMemo, useReducer } from 'react';
import { AppContext, IAppContext } from './AppContext.tsx';
import { TResumeData } from '../types/TResumeData.ts';
import { IFormData } from '../types/formTypes.ts';
import { resumePreviewData } from '../constants/resumePreviewData.tsx';
import { convertToImageString, IConvertOptions } from '../utils/convertToImageString.ts';
import { BLANK_IMAGE, initialFormData } from '../constants/formConstants.ts';
import { AppActionTypes, appReducer } from './AppReducer.ts';

// A broken image (stale URL from an old save, unpicked icon) should not block the whole resume
const convertOrBlank = (image?: string | FileList, options?: IConvertOptions) =>
  convertToImageString(image, options).catch((error: unknown) => {
    console.error('Error when converting image:', error);
    return BLANK_IMAGE;
  });

const normalizeFormData: (data: IFormData) => Promise<TResumeData> = async data => {
  const { interests, experience, education, contacts, photoLink, dayOfBirth, city, languages, ...rest } = data;
  const parser = new DOMParser();
  return {
    ...rest,
    photoLink: await convertOrBlank(photoLink.photo, { size: { width: 416, height: 300 }, crop: photoLink.crop }),
    info: [
      { type: 'dayOfBirth', value: dayOfBirth },
      { type: 'city', value: city },
      { type: 'languages', value: languages },
    ],
    experience: experience.map(exp => {
      const doc = parser.parseFromString(exp.description, 'text/html');
      const liElements = doc.querySelectorAll('li');
      liElements.forEach(li => {
        li.setAttribute('data-id', 'list-item');
      });
      return { ...exp, description: doc.body.innerHTML, workingPeriod: `${exp.startDate} - ${exp.endDate}` };
    }),
    education: education.map(edu => ({
      ...edu,
      educationPeriod: `${edu.startDate} - ${edu.endDate}`,
    })),
    contacts: await Promise.all(
      contacts.map(async contact => ({
        ...contact,
        icon: await convertOrBlank(contact.icon, { size: { width: 24, height: 24 }, color: 'white' }),
      }))
    ),
    interests: await Promise.all(
      interests.map(async interest => ({
        ...interest,
        icon: await convertOrBlank(interest.icon, { size: { width: 60, height: 60 } }),
      }))
    ),
  };
};

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    formData: initialFormData,
    resumeData: resumePreviewData,
  });

  const submitResume = useCallback(
    async (formData: IFormData) => {
      const resumeData = await normalizeFormData(formData);
      dispatch({ type: AppActionTypes.SUBMIT_FORM_DATA, payload: { resumeData, formData } });
    },
    [dispatch]
  );

  const loadSavedFormData = useCallback(
    (formData: IFormData) => {
      dispatch({ type: AppActionTypes.LOAD_SAVED_FORM_DATA, payload: formData });
    },
    [dispatch]
  );

  const appContext = useMemo<IAppContext>(
    () => ({
      ...state,
      submitResume,
      loadSavedFormData,
    }),
    [submitResume, state, loadSavedFormData]
  );
  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
