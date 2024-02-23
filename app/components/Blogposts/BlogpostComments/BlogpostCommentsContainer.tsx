'use client';

import BlogpostCommentsViewer from './BlogpostCommentsViewer';
import BlogpostCommentInput from './BlogpostCommentInput';
import { getBlogpostComments } from '@/services/blogServices';
import { useEffect, useState } from 'react';

interface Props {
  blogpostId: string;
}

const BlogpostCommentsContainer: React.FC<Props> = ({ blogpostId }) => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { blogpostComments, errMsg } = await getBlogpostComments({
        blogpostId,
        page: 1,
        searchQuery: '',
      });

      setComments(blogpostComments);
    })();
  }, []);

  console.log(comments);

  return (
    <>
      <BlogpostCommentsViewer />
      <BlogpostCommentInput blogpostId={blogpostId} />
    </>
  );
};

export default BlogpostCommentsContainer;
