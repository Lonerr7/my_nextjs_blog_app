export const cropStringByLength = (
  str: string,
  length: number,
  useWordBoundary?: boolean
) => {
  if (str.length <= length) {
    return str;
  }
  const subString = str.slice(0, length - 1); // the original check
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(' '))
      : subString) + '...'
  );
};

console.log(cropStringByLength('A very long string yeah', 15));
