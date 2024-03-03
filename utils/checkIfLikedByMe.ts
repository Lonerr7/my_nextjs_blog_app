export const checkIfLikedByMe = (
  mySessionId: string,
  likes?: string[]
) => (likes?.find((id) => id === mySessionId) ? true : false);
