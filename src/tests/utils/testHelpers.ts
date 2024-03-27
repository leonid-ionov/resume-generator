import fs from 'fs';
import path from 'path';
import mime from 'mime';

const fileToDataUri = (relativePath: string): string => {
  try {
    const filePath = path.resolve(__dirname, relativePath);
    const fileBuffer = fs.readFileSync(filePath);
    const mimeType = mime.getType(filePath) ?? 'image/png';

    return `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
  } catch (error) {
    console.error(`Error converting ${relativePath} to Data URI:`, error);
    throw error;
  }
};

const uriToBuffer = (uri: string): Buffer => {
  const base64Data = uri.replace(/^data:.*;base64,/, '');
  return Buffer.from(base64Data, 'base64');
};

export { uriToBuffer, fileToDataUri };
