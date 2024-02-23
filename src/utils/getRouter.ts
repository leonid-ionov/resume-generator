import { createBrowserRouter, createHashRouter, createMemoryRouter } from 'react-router-dom';

export const getRouter = (type?: string) => {
  switch (type) {
    case 'hash':
      return createHashRouter;
    case 'memory':
      return createMemoryRouter;
    case 'browser':
    default:
      return createBrowserRouter;
  }
};
