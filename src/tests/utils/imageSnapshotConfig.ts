import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

export const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotIdentifier: ({ currentTestName }) => {
    const parts = currentTestName.split(' > ');
    return `${parts[1]}-${parts[2].replace(/ /g, '_')}`;
  },
  failureThresholdType: 'percent',
  failureThreshold: 0.05,
});
