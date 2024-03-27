import { getRouter } from '../getRouter.ts';
import { createBrowserRouter, createHashRouter, createMemoryRouter } from 'react-router-dom';
import { RouterTypes } from '../../constants/environmentMaps.ts';

describe('getRouter', () => {
  test.each([
    [RouterTypes.BROWSER, createBrowserRouter],
    [RouterTypes.HASH, createHashRouter],
    [RouterTypes.MEMORY, createMemoryRouter],
  ])('Should return create router function for %s type', (type, expected) => {
    expect(getRouter(type)).toBe(expected);
  });

  test('Should return createBrowserRouter by default', () => {
    const router = getRouter();
    expect(router).toBe(createBrowserRouter);
  });
});
