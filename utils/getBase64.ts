import { getPlaiceholder } from 'plaiceholder';

async function getBase64(imageUrl: string | undefined) {
  try {
    if (!imageUrl) {
      throw new Error('No image url was provided');
    }
    const res = await fetch(imageUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
    }

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}

export const addBlurredDataUrls = async (images: any) => {
  const base64Promises = images?.map((photo: any) => getBase64(photo));

  const base64Results = await Promise.all(base64Promises);

  const photosWithBlur = images?.map((_: any, i: number) => {
    const blurredDataUrl = base64Results[i];
    return blurredDataUrl;
  });

  return photosWithBlur;
};
