import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import 'react-datetime/css/react-datetime.css';
import { AppContextProvider } from './context/AppContextProvider.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TPages } from './types/TPages.ts';
import { MainPage } from './pages/Main/MainPage.tsx';
import { FormPage } from './pages/FormPage/FormPage.tsx';
import { ResumePreviewPage } from './pages/ResumePreviewPage/ResumePreviewPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: TPages.MAIN,
        element: <MainPage />,
      },
      {
        path: TPages.FORM,
        element: <FormPage />,
      },
      {
        path: TPages.PREVIEW,
        element: <ResumePreviewPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
);
