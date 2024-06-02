import { ResumePreviewPage } from '../ResumePreviewPage.tsx';
import * as RouterModule from 'react-router';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HTMLOptions, jsPDF } from 'jspdf';

vi.mock('../../../context/useAppContext.tsx');
vi.mock('jspdf');

describe('ResumePreviewPage', () => {
  const mockUseLocation = vi.fn();

  beforeAll(() => {
    vi.spyOn(RouterModule, 'useLocation').mockImplementation(mockUseLocation);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test.each([
    ['preview', true],
    ['form', undefined],
  ])('Should render ResumeTemplate with %s data', (_, isPreview) => {
    mockUseLocation.mockReturnValue({ state: { isPreview } });
    const { asFragment } = render(<ResumePreviewPage />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Should save resume as PDF when Save as PDF button is clicked', async () => {
    const saveSpy = vi.fn();
    const htmlSpy = vi.fn();
    const internalMock = { pageSize: {} };

    (jsPDF as typeof vi.Mock).mockImplementation(() => ({
      html: htmlSpy.mockImplementation((_: string, options?: HTMLOptions) => {
        if (options && options.callback) options.callback({ save: saveSpy } as jsPDF);
      }),
      internal: internalMock,
    }));

    render(<ResumePreviewPage />);
    await vi.dynamicImportSettled();
    const saveButton = screen.getByRole('button', { name: 'Save as PDF' });
    await userEvent.click(saveButton);
    await waitFor(() => {
      expect(saveSpy).toHaveBeenCalledWith('John Doe Software Engineer CV.pdf', { returnPromise: true });
      expect(internalMock).toEqual({ pageSize: { width: 1224.1, height: 1720.1 }, scaleFactor: 1 });
      expect(htmlSpy.mock.calls[0][0]).toMatchSnapshot();
    });
  });

  test('Should handle error during PDF generation gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn());
    const mockError = new Error('PDF generation error');

    (jsPDF as typeof vi.Mock).mockImplementation(() => ({
      html: vi.fn().mockRejectedValue(mockError),
      internal: { pageSize: {} },
    }));

    render(<ResumePreviewPage />);

    const saveButton = screen.getByRole('button', { name: 'Save as PDF' });
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error when save resume as pdf:', mockError);
    });
    consoleErrorSpy.mockRestore();
  });
});
