import { FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { AppContext, IAppContext } from './AppContext.tsx';
import { TResumeData } from '../types/TResumeData.ts';
import { IFormData } from '../types/formTypes.ts';
import { initialFormData } from '../constants/formConstants.ts';
import { resumePreviewData } from '../constants/resumePreviewData.tsx';
import { convertToImageString } from '../utils/convertToImageString.ts';

const normalizeFormData: (data: IFormData) => Promise<TResumeData> = async data => {
  const { interests, experience, education, contacts, photoLink, dayOfBirth, city, languages, ...rest } = data;
  const parser = new DOMParser();
  return {
    ...rest,
    photoLink: await convertToImageString(photoLink.photo, { size: { width: 416, height: 300 }, crop: photoLink.crop }),
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
        icon: await convertToImageString(contact.icon, { size: { width: 24, height: 24 }, color: 'white' }),
      }))
    ),
    interests: await Promise.all(
      interests.map(async interest => ({
        ...interest,
        icon: await convertToImageString(interest.icon, { size: { width: 60, height: 60 } }),
      }))
    ),
  };
};

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const [resumeData, setResumeData] = useState<TResumeData>(resumePreviewData);
  const submitResume = useCallback(
    (data: IFormData) => {
      setFormData(prevState => ({ ...prevState, ...data }));
    },
    [setFormData]
  );

  useEffect(() => {
    normalizeFormData(formData)
      .then(data => {
        setResumeData(prevState => ({ ...prevState, ...data }));
      })
      .catch(error => {
        console.error(error);
      });
  }, [formData]);

  const appContext = useMemo<IAppContext>(
    () => ({
      resumeData,
      formData,
      submitResume,
    }),
    [submitResume, formData, resumeData]
  );
  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
