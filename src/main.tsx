import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import './fonts/Montserrat-LightItalic.ttf';
import './fonts/Montserrat-Regular.ttf';
import './fonts/Montserrat-Medium.ttf';
import './fonts/Montserrat-SemiBold.ttf';
import './fonts/OpenSans-Regular.ttf';
import './fonts/OpenSans-Italic.ttf';
import './fonts/OpenSans-Bold.ttf';
import { AppContextProvider } from './context/AppContextProvider.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TPages } from './types/TPages.ts';
import { MainPage } from './pages/Main/MainPage.tsx';
import { ResumeForm } from './pages/ResumeForm/ResumeForm.tsx';
import { ResumePreview } from './pages/ResumePreview/ResumePreview.tsx';

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
        element: <ResumeForm />,
      },
      {
        path: TPages.PREVIEW,
        element: <ResumePreview />,
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
