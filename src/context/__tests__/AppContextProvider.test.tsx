import { act, render } from '@testing-library/react';
import { AppContextProvider } from '../AppContextProvider.tsx';
import useAppContext from '../useAppContext.tsx';
import { IAppContext } from '../AppContext.tsx';
import { BLANK_IMAGE, initialFormData } from '../../constants/formConstants.ts';
import { convertToImageString } from '../../utils/convertToImageString.ts';

vi.mock('../../utils/convertToImageString.ts');

describe('AppContextProvider', () => {
  let context: IAppContext;
  const Probe = () => {
    context = useAppContext();
    return null;
  };

  test('Should build resume from a saved file even if its images are broken', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn());
    vi.mocked(convertToImageString).mockImplementation((image?: string | FileList) =>
      image ? Promise.reject(new Error('404')) : Promise.resolve(BLANK_IMAGE)
    );
    render(
      <AppContextProvider>
        <Probe />
      </AppContextProvider>
    );

    act(() =>
      context.loadSavedFormData({
        ...initialFormData,
        userName: 'Jane Doe',
        photoLink: { photo: 'https://old.example/photo.png' },
        contacts: [
          { info: 'jane@example.com', icon: 'https://old.example/assets/email-a1b2c3.svg' },
          { info: 'jane.dev', icon: 'Select icon' },
        ],
      })
    );
    await act(() => context.submitResume(context.formData));

    expect(context.resumeData?.userName).toBe('Jane Doe');
    expect(context.resumeData?.photoLink).toBe(BLANK_IMAGE);
    expect(context.resumeData?.contacts).toEqual([
      { info: 'jane@example.com', icon: BLANK_IMAGE },
      { info: 'jane.dev', icon: BLANK_IMAGE },
    ]);
    consoleErrorSpy.mockRestore();
  });
});
