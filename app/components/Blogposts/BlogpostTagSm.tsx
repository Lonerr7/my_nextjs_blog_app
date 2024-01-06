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

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <button
      className={`px-2.5 py-1 text-sm leading-5 max-w-[100px] text-blogpost-tag-primary bg-blogpost-tag-primary/5 text-center border rounded-md border-transparent mb-4`}
      onClick={handleTagClick}
    >
      {tag}
    </button>
  );
};

export default BlogpostTag;
