export const checkIfBlogpostIsLikedByMe = (
  mySessionId: string,
  likes?: string[]
) => (likes?.find((id) => id === mySessionId) ? true : false);
