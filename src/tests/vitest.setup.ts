import { toMatchImageSnapshot } from './utils/imageSnapshotConfig.ts';

Object.defineProperty(process, 'env', {
  value: {
    NODE_ENV: 'test',
  },
});

expect.extend({ toMatchImageSnapshot });
