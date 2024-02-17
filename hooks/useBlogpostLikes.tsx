import { getSingleBlogpostLikes } from '@/services/blogServices';
import { IBlogpostLikedUsers } from '@/types/blogTypes';
import { useEffect, useState } from 'react';

export const useBlogpostLikes = ({
  blogpostId,
  pageNumber,
}: {
  blogpostId: string;
  pageNumber: number;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);
  const [likedUsers, setLikedUsers] = useState<IBlogpostLikedUsers>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getSingleBlogpostLikes({
      blogpostId,
      page: pageNumber,
    })
      .then((res) => {
        if (res.blogpostLikes) {
          console.log(res.blogpostLikes);
          
          setLikedUsers((prevState) => [...prevState, ...res.blogpostLikes]);

          setHasMore(res.blogpostLikes?.length > 0);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line
  }, [pageNumber]);

  return { loading, error, likedUsers, hasMore };
};
