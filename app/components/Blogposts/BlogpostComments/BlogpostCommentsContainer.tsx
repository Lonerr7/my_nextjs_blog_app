'use client';

import BlogpostCommentsViewer from './BlogpostCommentsViewer';
import BlogpostCommentInput from './BlogpostCommentInput';

interface Props {
  blogpostId: string;
}

const BlogpostCommentsContainer: React.FC<Props> = ({ blogpostId }) => {
  return (
    <>
      <BlogpostCommentsViewer />
      <BlogpostCommentInput blogpostId={blogpostId} />
    </>
  );
};

export default BlogpostCommentsContainer;
