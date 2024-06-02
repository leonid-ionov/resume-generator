import { FormPage } from '../FormPage.tsx';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { convertToImageString } from '../../../utils/convertToImageString.ts';
import { mockFormData, mockLoadSavedFormData } from '../../../context/__mocks__/useAppContext.tsx';
import { VALIDATION_STRING } from '../../../constants/formConstants.ts';

vi.mock('../../../context/useAppContext.tsx');

vi.mock('../../../utils/convertToImageString.ts');

vi.mock('../../../features/ResumeForm/ResumeForm.tsx', () => ({
  ResumeForm: () => <button>Submit changes</button>,
}));

describe('FormPage', () => {
  const getSaveButton = () => screen.getByRole('button', { name: 'Save form' });
  const getFileInput = () => screen.getByLabelText('Fill Form From Save');
  const mockBlob = new Blob(['mock-content'], { type: 'application/json' });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Should render component with all elements', () => {
    render(<FormPage />);

    expect(screen.getByRole('heading', { name: 'Create your own resume' })).toBeInTheDocument();
    expect(getSaveButton()).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fill Form From Save/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit changes' })).toBeInTheDocument();
  });

  test('Should save form data to json file', async () => {
    render(<FormPage />);

    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');
    const createElementSpy = vi.spyOn(document, 'createElement');
    const blobSpy = vi.spyOn(global, 'Blob').mockImplementation(() => mockBlob);

    const saveButton = getSaveButton();
    await userEvent.click(saveButton);

    expect(convertToImageString).toHaveBeenCalledTimes(3);

    const [content] = blobSpy.mock.calls[0];
    const jsonContent = JSON.parse(content as string);

    expect(jsonContent.appStamp).toBe(VALIDATION_STRING);
    expect(appendChildSpy).toHaveBeenCalledTimes(1);
    expect(removeChildSpy).toHaveBeenCalledTimes(1);
    expect(createElementSpy).toHaveBeenCalledWith('a');

    const downloadLink = appendChildSpy.mock.calls[0][0];
    expect(downloadLink.getAttribute('href')).toBe('mock-url');
    expect(downloadLink.getAttribute('download')).toBe(`Resume Form ${mockFormData.userName}`);
  });

  test('Should load form data from json file', async () => {
    const mockFile = new File([JSON.stringify({ ...mockFormData, appStamp: VALIDATION_STRING })], 'form.json', {
      type: 'application/json',
    });

    render(<FormPage />);

    const fileInput = getFileInput();
    await userEvent.upload(fileInput, mockFile);

    expect(mockLoadSavedFormData).toHaveBeenCalledTimes(1);
    expect(mockLoadSavedFormData).toHaveBeenCalledWith(mockFormData);
  });

  test.each([
    ['file', 'invalid json', ['Error when loading a form file:', expect.any(Error)]],
    ['format', JSON.stringify({ appStamp: 'invalid stamp' }), ['Error when loading a form file: Invalid file format']],
  ])('Should handle invalid json %s', async (_, jsonString, expected) => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn());
    const invalidFile = new File([jsonString], 'form.json', { type: 'application/json' });

    render(<FormPage />);
    const fileInput = getFileInput();
    await userEvent.upload(fileInput, invalidFile);
    const [errorMessage, errorValue] = expected;

    expect(mockLoadSavedFormData).not.toHaveBeenCalled();
    if (errorValue) expect(consoleErrorSpy).toHaveBeenCalledWith(errorMessage, errorValue);
    else expect(consoleErrorSpy).toHaveBeenCalledWith(errorMessage);

    consoleErrorSpy.mockRestore();
  });
});
