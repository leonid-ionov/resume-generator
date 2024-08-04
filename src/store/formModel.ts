import { createStore, createEvent, createEffect, sample } from 'effector';
import { TResumeData } from '../types/TResumeData';
import { IFormData, IStampedFormData } from '../types/formTypes';
import { IconsOptions, VALIDATION_STRING } from '../constants/formConstants';
import { convertToImageString } from '../utils/convertToImageString';
import { initialFormData } from '../constants/formConstants';
import { resumePreviewData } from '../constants/resumePreviewData';
import { isProdEnv } from '../tests/utils/testHelpers.ts';

const normalizeContactIcon = (iconUrl: string) => {
  const iconName = iconUrl.match(/\/([^/]+)\.svg$/)?.[1];
  if (!iconName) return iconUrl;
  const iconOption = IconsOptions.find(option => option.label.toLowerCase().replace(' ', '') === iconName);
  return iconOption ? iconOption.value : iconUrl;
};

const normalizeFormDataFx = createEffect(async (data: IFormData): Promise<TResumeData> => {
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
});

const loadFormDataFx = createEffect<File | undefined, IFormData>(file => {
  return new Promise<IFormData>((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const data = JSON.parse(e.target?.result as string) as IStampedFormData;
          const { appStamp, ...formData } = data;
          if (appStamp !== VALIDATION_STRING) {
            console.error('Error when loading a form file: Invalid file format');
            reject(new Error('Invalid file format'));
            return;
          }
          resolve(formData);
        } catch (error) {
          console.error('Error when loading a form file:', error);
          reject(error);
        }
      };
      reader.readAsText(file);
    } else {
      reject(new Error('No file provided'));
    }
  });
});

const submitFormData = createEvent<IFormData>();

const $formData = createStore<IFormData>(initialFormData)
  .on(submitFormData, (_, payload) => payload)
  .on(loadFormDataFx.doneData, (_, payload) => {
    const { contacts } = payload;
    const shouldNormalizeContacts = contacts.length > 0 && isProdEnv() && contacts[0].icon.includes('localhost');
    const normalizedContacts = shouldNormalizeContacts
      ? contacts.map(({ info, icon }) => ({
          info,
          icon: normalizeContactIcon(icon),
        }))
      : contacts;
    return { ...payload, contacts: normalizedContacts };
  });

const $resumeData = createStore<TResumeData>(resumePreviewData).on(
  normalizeFormDataFx.doneData,
  (_, payload) => payload
);

sample({
  clock: submitFormData,
  target: normalizeFormDataFx,
});

export default {
  stores: { $formData, $resumeData },
  events: { submitFormData },
  effects: { loadFormDataFx },
};
