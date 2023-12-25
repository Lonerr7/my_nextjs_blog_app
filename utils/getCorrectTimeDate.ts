export const getCorrectDateTime = () => {
  const date = new Date();
  date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);

  return date.toISOString();
};
