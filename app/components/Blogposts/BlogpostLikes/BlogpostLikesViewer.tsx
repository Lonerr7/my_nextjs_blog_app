'use client';

import { getSingleBlogpostLikes } from '@/services/blogServices';
import { IBlogpostRichLikes } from '@/types/blogTypes';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  blogpostId: string;
}

const BlogpostLikesViewer: React.FC<Props> = ({ blogpostId }) => {
  const [likes, setLikes] = useState<IBlogpostRichLikes | null>(null);

  console.log(likes);

  useEffect(() => {
    (async () => {
      const { blogpostLikes, errMsg } = await getSingleBlogpostLikes(
        blogpostId,
        {
          page: 1,
        }
      );

      if (errMsg) {
        toast.error(errMsg);
        return;
      }

      if (blogpostLikes) {
        setLikes((prevState) => ({ ...prevState, ...blogpostLikes }));
      }
    })();

    // eslint-disable-next-line
  }, []);

  return <div className="overflow-y-scroll"></div>;
};

export default BlogpostLikesViewer;
