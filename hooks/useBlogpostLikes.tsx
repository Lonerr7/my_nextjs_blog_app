import { getSingleBlogpostLikes } from '@/services/blogServices';
import { IBlogpostLikedUsers } from '@/types/blogTypes';
import { useEffect, useState } from 'react';

export const useBlogpostLikes = ({
  blogpostId,
  pageNumber,
  searchQuery,
}: {
  blogpostId: string;
  pageNumber: number;
  searchQuery: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [likedUsers, setLikedUsers] = useState<IBlogpostLikedUsers>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLikedUsers([]);
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    setError('');

    getSingleBlogpostLikes({
      blogpostId,
      page: pageNumber,
      searchQuery,
    })
      .then((res) => {
        if (res.blogpostLikes) {
          setLikedUsers((prevState) => [...prevState, ...res.blogpostLikes]);
          setHasMore(res.blogpostLikes?.length > 0);
        }

        if (res.errMsg) {
          throw new Error(res.errMsg);
        }
      })
      .catch((err: Error) => {
        console.error(err);

        setError('Something went wrong! Try again later!');
      })
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line
  }, [pageNumber, searchQuery]);

  return { loading, error, likedUsers, hasMore };
};
