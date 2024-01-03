import { BlogpostTags } from '@/types/blogTypes';
import React from 'react';

interface Props {
  tag: BlogpostTags;
  isInFullWidth?: boolean;
}

const BlogpostTag: React.FC<Props> = ({ tag, isInFullWidth }) => {
  return (
    <p
      className={`px-2.5 py-1 cursor-pointer text-sm leading-5 max-w-[100px] text-center border rounded-md border-transparent mb-4 ${
        isInFullWidth
          ? 'bg-blogpost-tag-primary text-white'
          : 'text-blogpost-tag-primary bg-blogpost-tag-primary/5'
      }`}
    >
      {tag}
    </p>
  );
};

export default BlogpostTag;
