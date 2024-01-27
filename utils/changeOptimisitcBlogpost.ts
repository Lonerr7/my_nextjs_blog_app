import { ISmBlogpost } from '@/types/blogTypes';

export const changeOptimisitcBlogpost = (
  state: ISmBlogpost[] | undefined,
  { blogpostId, userId }: { blogpostId?: string; userId?: string }
) => {
  // 1. Если мы одновременно передали блогпост айди и юзерайди - мы хотим лайкнуть или дизлайкнуть блогпост
  if (blogpostId && userId) {
    return state?.map((blogpost) => {
      if (blogpost._id === blogpostId) {
        if (blogpost.likes[userId]) {
          delete blogpost.likes[userId];
        } else if (!blogpost.likes[userId]) {
          blogpost.likes[userId] = true;
        }

        return blogpost;
      }

      return blogpost;
    });
  }

  // 2. Если передали только блогпост айди - то хотим только лишь удалить блогпост
  return state?.filter((blogpost) => blogpost._id !== blogpostId);
};
