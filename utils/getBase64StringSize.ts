export const getBase64Size = (base64String: string, inKb?: boolean) => {
  const stringLength = base64String.length - 'data:image/png;base64,'.length;

  const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;

  if (inKb) {
    return sizeInBytes / 1024;
  }

  return sizeInBytes;
};
