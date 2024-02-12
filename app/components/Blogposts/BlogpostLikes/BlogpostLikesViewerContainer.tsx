'use client';

import { getSingleBlogpostLikes } from '@/services/blogServices';
import { IBlogpostLikedUsers } from '@/types/blogTypes';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import BlogpostLikesViewer from './BlogpostLikesViewer';

interface Props {
  blogpostId: string;
  mySessionId: string;
}

const BlogpostLikesViewerContainer: React.FC<Props> = ({ blogpostId, mySessionId }) => {
  const [likedUsers, setLikedUsers] = useState<IBlogpostLikedUsers>([]);

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
        console.log(blogpostLikes);

        setLikedUsers((prevState) => [...prevState, ...blogpostLikes]);
      }
    })();

    // eslint-disable-next-line
  }, []);

  return <BlogpostLikesViewer likedUsers={likedUsers} mySessionId={mySessionId} />;
};

export default BlogpostLikesViewerContainer;
