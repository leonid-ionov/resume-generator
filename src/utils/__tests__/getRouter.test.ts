import { getRouter } from '../getRouter.ts';
import { createBrowserRouter, createHashRouter, createMemoryRouter } from 'react-router-dom';

describe('getRouter', () => {
  test.each([
    ['browser', createBrowserRouter],
    ['hash', createHashRouter],
    ['memory', createMemoryRouter],
  ])('Should return create router function for each type', (type, router) => {
    expect(getRouter(type)).toBe(router);
  });

  test('Should return createBrowserRouter by default', () => {
    const router = getRouter();
    expect(router).toBe(createBrowserRouter);
  });
});
