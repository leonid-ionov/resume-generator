import { convertToImageString, IConvertOptions } from '../convertToImageString.ts';
import { BLANK_IMAGE } from '../../constants/formConstants.ts';
import MockFileList from '../../tests/utils/mocks/MockFileList.ts';
import { fileToDataUri, uriToBuffer } from '../../tests/utils/testHelpers.ts';

describe('convertToImageString', () => {
  const fileList = new MockFileList(1).list;
  const emptyFileList = new MockFileList(0).list;
  const mockImage = fileToDataUri('../../assets/images/pirate.png');
  const originalCreateObjectURL = (...args: Parameters<typeof URL.createObjectURL>) =>
    URL.createObjectURL.call(URL, ...args);
  const mockCreateObjectURL = vi.fn().mockReturnValue(mockImage);

  Object.defineProperty(URL, 'createObjectURL', {
    value: mockCreateObjectURL,
    writable: true,
  });

  afterAll(() => {
    URL.createObjectURL = originalCreateObjectURL;
    vi.restoreAllMocks();
  });

  test.each([
    ['undefined', undefined],
    ['empty string', ''],
    ['empty file list', emptyFileList],
  ])('Should return "about:blank" for %s', async (_, image) => {
    const imageString = await convertToImageString(image);

    expect(imageString).toBe(BLANK_IMAGE);
  });

  const size = { width: 208, height: 155 };
  const crop = { x: 104, y: 77, ...size };
  const color = 'red';
  const scenarios: [string, string | FileList, IConvertOptions][] = [
    ['from a url', mockImage, {}],
    ['from a FileList', fileList, {}],
    ['with custom width and height', mockImage, { size }],
    ['with crop', mockImage, { crop }],
    ['with custom color', mockImage, { color }],
    ['with all possible options', mockImage, { size, crop, color }],
  ];

  test.each(scenarios)('Should create an image %s', async (_, image, options) => {
    const imageString = await convertToImageString(image, options);
    const imageBuffer = uriToBuffer(imageString);

    expect(imageBuffer).toMatchImageSnapshot();
  });

  test('Should handle image load error', async () => {
    const spyConsoleError = vi.spyOn(console, 'error').mockReturnValue(vi.fn);
    await expect(convertToImageString('invalid_url')).rejects.toEqual(['Error by creating image', expect.any(Event)]);
    expect(spyConsoleError).toHaveBeenCalled();
    spyConsoleError.mockRestore();
  });

  test('Should throw an error if canvas context is not available', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    await expect(convertToImageString(fileList)).rejects.toThrow('Some problem with canvas');
  });
});
