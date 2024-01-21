import { CSSProperties, ReactElement } from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { styleToCss } from './styleToCss.ts';
import html2canvas from 'html2canvas';

export const convertToImageString = async (icon: ReactElement | string | FileList, style?: CSSProperties) => {
  let element: HTMLDivElement | HTMLImageElement | null;
  if (typeof icon === 'string' || icon instanceof FileList) {
    element = document.createElement('img');
    element.setAttribute('src', typeof icon === 'string' ? icon : URL.createObjectURL(icon[0]));
  } else {
    element = document.createElement('div');
    element.innerHTML = ReactDOMServer.renderToString(icon);
  }

  element.setAttribute(
    'style',
    styleToCss({ display: 'flex', justifyContent: 'center', alignItems: 'center', ...style } ?? {})
  );
  document.body.appendChild(element);
  const canvas = await html2canvas(element, { backgroundColor: 'transparent' });
  document.body.removeChild(element);
  return canvas.toDataURL('image/png');
};
