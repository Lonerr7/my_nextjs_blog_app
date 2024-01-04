import { getPlaiceholder } from 'plaiceholder';

async function getBase64(imageUrl: string) {
  try {
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

export const addBlurredDataUrls = async (images: string[] | undefined) => {
  if (!images) {
    return null;
  }

  const base64Promises = images?.map((photo) => getBase64(photo));

  const base64Results = await Promise.all(base64Promises);

  const photosWithBlur = images?.map((_: any, i: number) => {
    const blurredDataUrl = base64Results[i];
    return blurredDataUrl;
  });

  return photosWithBlur;
};
