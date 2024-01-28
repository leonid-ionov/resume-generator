import { Area, Size } from 'react-easy-crop';

const createImage: (url: string) => Promise<HTMLImageElement> = url =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = error => reject(error);
    image.src = url;
  });

export const convertToImageString = async (icon: string | FileList, size?: Size, crop?: Area): Promise<string> => {
  let imageSrc: string;
  if (typeof icon === 'string') {
    imageSrc = icon;
  } else {
    imageSrc = URL.createObjectURL(icon[0]);
  }
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Some problem with canvas');
  }

  canvas.width = size?.width ?? image.width;
  canvas.height = size?.height ?? image.height;

  if (!crop) {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height);
  }

  return new Promise(resolve => {
    resolve(canvas.toDataURL('image/png'));
  });
};
