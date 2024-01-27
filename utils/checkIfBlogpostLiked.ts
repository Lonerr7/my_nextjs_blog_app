import { BlogpostLikes } from '@/types/blogTypes';

export const checkedIfBlogpostLiked = ({
  likes,
  mySessionId,
}: {
  likes?: BlogpostLikes;
  mySessionId?: string;
}) => {
  return likes && mySessionId ? likes[mySessionId] : false;
};
