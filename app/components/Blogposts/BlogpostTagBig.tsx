import { BlogpostTags } from '@/types/blogTypes';
import React from 'react';

interface Props {
  tag: BlogpostTags;
}

const BlogpostTagBig: React.FC<Props> = ({ tag }) => {
  return (
    <button
      className={`px-2.5 py-1 text-sm leading-5 max-w-[100px] text-center border rounded-md border-transparent mb-4 bg-blogpost-tag-primary text-white`}
    >
      {tag}
    </button>
  );
};

export default BlogpostTagBig;
