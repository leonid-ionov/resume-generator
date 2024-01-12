import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { AppContext, IAppContext } from './AppContext.tsx';
import { TResumeData } from '../types/TResumeData.ts';
import { IFormData } from '../types/formTypes.ts';
import { IconMap, initialFormData } from '../constants/formConstants.ts';

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [formData, setFormData] = useState<IFormData>(initialFormData);

  const normalizeFormData: (data: IFormData) => TResumeData = data => {
    const { contacts, photoLink, dayOfBirth, city, languages, ...rest } = data;
    return {
      ...rest,
      photoLink: URL.createObjectURL(photoLink[0]),
      info: [
        { type: 'dayOfBirth', value: dayOfBirth },
        { type: 'city', value: city },
        { type: 'languages', value: languages },
      ],
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
