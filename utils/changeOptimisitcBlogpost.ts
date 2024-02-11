import { ISmBlogpost } from '@/types/blogTypes';

export const changeOptimisitcBlogpost = (
  state: ISmBlogpost[] | undefined,
  blogpostId: string
) => {
  return state?.map((blogpost) => {
    if (blogpost._id === blogpostId) {
      if (blogpost.isLikedByMe) {
        blogpost.likesCount -= 1;
        blogpost.isLikedByMe = false;
      } else {
        blogpost.likesCount += 1;
        blogpost.isLikedByMe = true;
      }
    }

    return blogpost;
  });
};
