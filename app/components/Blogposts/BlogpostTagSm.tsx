'use client';

import { BlogpostTags } from '@/types/blogTypes';
import { SearchQueriesNames } from '@/types/requestTypes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
  tag: BlogpostTags;
}

const BlogpostTag: React.FC<Props> = ({ tag }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set(SearchQueriesNames.BLOGPOSTS_TAG_FILTER, tag);
    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <button className="blogpost-tag" onClick={handleTagClick}>
      {tag}
    </button>
  );
};

export default BlogpostTag;
