'use client';

import { getSingleBlogpostLikes } from '@/services/blogServices';
import { IBlogpostRichLikes } from '@/types/blogTypes';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import BlogpostLikesViewer from './BlogpostLikesViewer';

interface Props {
  blogpostId: string;
}

const BlogpostLikesViewerContainer: React.FC<Props> = ({ blogpostId }) => {
  const [likedUsers, setLikedUsers] = useState<IBlogpostRichLikes | null>(null);

  console.log(likedUsers);

  useEffect(() => {
    (async () => {
      const { blogpostLikes, errMsg } = await getSingleBlogpostLikes(
        blogpostId,
        {
          page: 1, //!
        }
      );

      if (errMsg) {
        toast.error(errMsg);
        return;
      }

      if (blogpostLikes) {
        setLikedUsers((prevState) => ({ ...prevState, ...blogpostLikes }));
      }
    })();

    // eslint-disable-next-line
  }, []);

  return (
    <BlogpostLikesViewer
    // likedUsers={likedUsers}
    // mySessionId={session?.user.id}
    />
  );
};

export default BlogpostLikesViewerContainer;
