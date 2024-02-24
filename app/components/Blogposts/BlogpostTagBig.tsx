import { BlogpostTags } from '@/types/blogTypes';
import React from 'react';

interface Props {
  customClassName?: string;
  tag: BlogpostTags;
}

const BlogpostTagBig: React.FC<Props> = ({ tag, customClassName }) => {
  return (
    <p
      className={`px-2.5 py-1 text-sm leading-5 max-w-[100px] text-center border rounded-md border-transparent mb-4 bg-blogpost-tag-primary text-white ${customClassName}`}
    >
      {tag}
    </p>
  );
};

export default BlogpostTagBig;
