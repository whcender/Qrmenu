import sharp from 'sharp';

export const convertToWebP = async (inputBuffer: ArrayBuffer) => {
  return await sharp(Buffer.from(inputBuffer))
    .webp({ quality: 80 })
    .toBuffer();
};
