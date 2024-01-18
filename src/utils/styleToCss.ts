import { CSSProperties } from 'react';

export const styleToCss = (style: CSSProperties) => {
  return Object.entries(style)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}:${v}`)
    .join(';');
};
