import { toMatchImageSnapshot } from './utils/imageSnapshotConfig.ts';
import '@testing-library/jest-dom';

Object.defineProperty(process, 'env', {
  value: {
    NODE_ENV: 'test',
  },
});

expect.extend({ toMatchImageSnapshot });

const originalCreateObjectURL = (...args: Parameters<typeof URL.createObjectURL>) =>
  URL.createObjectURL.call(URL, ...args);
const originalRevokeObjectURL = (...args: Parameters<typeof URL.revokeObjectURL>) =>
  URL.revokeObjectURL.call(URL, ...args);
const mockCreateObjectURL = vi.fn().mockReturnValue('mock-url');

Object.defineProperty(URL, 'createObjectURL', {
  value: mockCreateObjectURL,
  writable: true,
});
Object.defineProperty(URL, 'revokeObjectURL', {
  value: vi.fn(),
  writable: true,
});

afterAll(() => {
  URL.createObjectURL = originalCreateObjectURL;
  URL.revokeObjectURL = originalRevokeObjectURL;
});

export { mockCreateObjectURL };
