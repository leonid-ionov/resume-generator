import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { AppContext, IAppContext } from './AppContext.tsx';
import { TResumeData } from '../types/TResumeData.ts';
import { IFormData } from '../types/formTypes.ts';
import { IconMap, initialFormData } from '../constants/formConstants.ts';

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [formData, setFormData] = useState<IFormData>(initialFormData);

  const normalizeFormData: (data: IFormData) => TResumeData = data => {
    const { interests, experience, education, contacts, photoLink, dayOfBirth, city, languages, ...rest } = data;
    return {
      ...rest,
      photoLink: URL.createObjectURL(photoLink[0]),
      info: [
        { type: 'dayOfBirth', value: dayOfBirth },
        { type: 'city', value: city },
        { type: 'languages', value: languages },
      ],
      experience: experience.map(exp => ({
        ...exp,
        workingPeriod: `${exp.startDate} - ${exp.endDate}`,
      })),
      education: education.map(edu => ({
        ...edu,
        educationPeriod: `${edu.startDate} - ${edu.endDate}`,
      })),
      interests: interests.map(int => ({
        name: int.name,
        icon: typeof int.icon === 'string' ? int.icon : URL.createObjectURL(int.icon[0]),
      })),
      contacts: contacts.map(contact => ({ ...contact, icon: IconMap[contact.icon] })),
    };
  };
  const appContext = useMemo<IAppContext>(
    () => ({
      resumeData: normalizeFormData(formData),
      formData,
      submitResume: data => {
        setFormData(prevState => ({ ...prevState, ...data }));
      },
    }),
    [setFormData, formData]
  );
  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
