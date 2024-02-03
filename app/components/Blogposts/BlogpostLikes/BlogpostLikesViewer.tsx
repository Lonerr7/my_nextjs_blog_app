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
          page: 1, //!
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

  return (
    <div className="w-full">
      <h4 className="font-semibold py-4 w-full block border-b border-solid border-item-gray text-center">
        Likes
      </h4>
      <ul className="px-4 py-2 flex flex-col items-center">d</ul>
    </div>
  );
};

export default BlogpostLikesViewer;
