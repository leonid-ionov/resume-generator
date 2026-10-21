import { AppActionTypes, appReducer, IAppState } from '../AppReducer.ts';
import { IconsOptions, initialFormData } from '../../constants/formConstants.ts';
import { resumePreviewData } from '../../constants/resumePreviewData.tsx';

describe('appReducer', () => {
  const state: IAppState = { formData: initialFormData, resumeData: resumePreviewData };
  const emailIcon = IconsOptions.find(option => option.label === 'Email')!.value;
  const webSiteIcon = IconsOptions.find(option => option.label === 'Web site')!.value;

  test.each([
    ['vite build', 'https://leonid-ionov.github.io/resume-generator/assets/email-a1b2c3.svg', emailIcon],
    ['next build', 'http://localhost:3000/_next/static/media/email.9e30f8f0.svg', emailIcon],
    ['unhashed name', 'http://localhost:5173/src/assets/icons/website.svg', webSiteIcon],
    ['unknown value', 'Select icon', 'Select icon'],
  ])('Should map saved contact icon from %s to the current icon', (_, savedIcon, expectedIcon) => {
    const { formData } = appReducer(state, {
      type: AppActionTypes.LOAD_SAVED_FORM_DATA,
      payload: { ...initialFormData, contacts: [{ info: 'me@example.com', icon: savedIcon }] },
    });

    expect(formData.contacts[0].icon).toBe(expectedIcon);
  });
});
