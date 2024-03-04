import { Area, Size } from 'react-easy-crop';
import { BLANK_IMAGE } from '../constants/formConstants.ts';

const createImage: (url: string) => Promise<HTMLImageElement> = url =>
  new Promise((resolve, reject) => {
    const image = new Image();
    if (url === BLANK_IMAGE) {
      resolve(image);
      return;
    }
    image.onload = () => resolve(image);
    image.onerror = error => reject(['Error by creating image', error]);
    image.src = url;
  });

interface IConvertOptions {
  size?: Size;
  crop?: Area;
  color?: string;
}

type TConvertToImageString = (image?: string | FileList, options?: IConvertOptions) => Promise<string>;

export const convertToImageString: TConvertToImageString = async (image, options) => {
  if (!image || image === '' || !image[0]) {
    return BLANK_IMAGE;
  }

  let imageSrc: string;
  if (typeof image === 'string') {
    imageSrc = image;
  } else imageSrc = URL.createObjectURL(image[0]);
  const imageElement = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Some problem with canvas');
  }

  canvas.width = options?.size?.width ?? imageElement.width;
  canvas.height = options?.size?.height ?? imageElement.height;

  if (!options?.crop) {
    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.drawImage(
      imageElement,
      options.crop.x,
      options.crop.y,
      options.crop.width,
      options.crop.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  if (options?.color) {
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = options.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';
  }

  return new Promise(resolve => {
    resolve(canvas.toDataURL('image/png'));
  });
};
