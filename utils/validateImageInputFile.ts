export const isImageInputFileValid = (
  imageInputFile: File | null,
  inputRef: React.RefObject<HTMLInputElement>,
  setFile: (value: React.SetStateAction<File | undefined>) => void
) => {
  if (
    !imageInputFile ||
    imageInputFile.size > 1024 ** 2 ||
    !imageInputFile.type.startsWith('image/')
  ) {
    setFile(undefined);

    if (inputRef && inputRef?.current?.value) {
      inputRef.current.value = '';
    }

    
    return false;
  }

  return true;
};
