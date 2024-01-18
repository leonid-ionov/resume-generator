import { CSSProperties, FC, PropsWithChildren, ReactElement, useEffect, useMemo, useState } from 'react';
import { AppContext, IAppContext } from './AppContext.tsx';
import { TResumeData } from '../types/TResumeData.ts';
import { IFormData } from '../types/formTypes.ts';
import { IconMap, initialFormData } from '../constants/formConstants.ts';
import * as ReactDOMServer from 'react-dom/server';
import html2canvas from 'html2canvas';
import { styleToCss } from '../utils/styleToCss.ts';
import { resumePreviewData } from '../constants/resumePreviewData.tsx';

const convertSVGToImage = async (icon: ReactElement | string | FileList, style?: CSSProperties) => {
  let element: HTMLDivElement | HTMLImageElement | null = null;
  if (typeof icon === 'string' || icon instanceof FileList) {
    element = document.createElement('img');
    element.setAttribute('src', typeof icon === 'string' ? icon : URL.createObjectURL(icon[0]));
  } else {
    element = document.createElement('div');
    element.innerHTML = ReactDOMServer.renderToString(icon);
  }
  element.setAttribute(
    'style',
    styleToCss({ display: 'flex', justifyContent: 'center', alignItems: 'center', ...style } ?? {})
  );
  document.body.appendChild(element);
  const canvas = await html2canvas(element, { backgroundColor: 'transparent' });
  document.body.removeChild(element);
  return canvas.toDataURL('image/png');
};

const normalizeFormData: (data: IFormData) => Promise<TResumeData> = async data => {
  const { interests, experience, education, contacts, photoLink, dayOfBirth, city, languages, ...rest } = data;
  const parser = new DOMParser();
  const contactsIconStyle = { width: '24px', height: '24px', color: 'white' };
  const interestsIconStyle = { width: '60px', height: '60px' };

  return {
    ...rest,
    photoLink: URL.createObjectURL(photoLink[0]),
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
        icon: await convertSVGToImage(IconMap[contact.icon], contactsIconStyle),
      }))
    ),
    interests: await Promise.all(
      interests.map(async interest => ({
        ...interest,
        icon: await convertSVGToImage(interest.icon, interestsIconStyle),
      }))
    ),
  };
};

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const [resumeData, setResumeData] = useState<TResumeData>(resumePreviewData);

  useEffect(() => {
    normalizeFormData(formData)
      .then(data => setResumeData(data))
      .catch(() => {
        /* Implement error handling in the future */
      });
  }, [formData]);

  const appContext = useMemo<IAppContext>(
    () => ({
      resumeData,
      formData,
      submitResume: data => {
        setFormData(prevState => ({ ...prevState, ...data }));
      },
    }),
    [setFormData, formData, resumeData]
  );
  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
