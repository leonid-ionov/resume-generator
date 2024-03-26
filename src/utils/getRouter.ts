import { createBrowserRouter, createHashRouter, createMemoryRouter } from 'react-router-dom';
import { RouterTypes } from '../constants/environmentMaps.ts';

export const getRouter = (type?: RouterTypes) => {
  switch (type) {
    case RouterTypes.HASH:
      return createHashRouter;
    case RouterTypes.MEMORY:
      return createMemoryRouter;
    case RouterTypes.BROWSER:
    default:
      return createBrowserRouter;
  }
};
