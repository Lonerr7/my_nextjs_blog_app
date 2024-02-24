export const formatNumber = (likes: number) => {
  const formatter = Intl.NumberFormat('en', {
    notation: 'compact',
  });

  return formatter.format(likes);
};
