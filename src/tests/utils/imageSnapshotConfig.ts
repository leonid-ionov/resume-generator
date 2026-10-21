import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

export const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotIdentifier: ({ currentTestName }) => {
    const [describeName, testName] = currentTestName.split(' > ').slice(-2);
    return `${describeName}-${testName.replace(/ /g, '_')}`;
  },
  failureThresholdType: 'percent',
  failureThreshold: 0.05,
});
