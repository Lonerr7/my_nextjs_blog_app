'use client';

import { BlogpostTags } from '@/types/blogTypes';
import { SearchQueriesNames } from '@/types/requestTypes';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { useDebouncedCallback } from 'use-debounce';
import SearchTag from './SearchTag';

interface Props {
  palceholder: string;
  queryToChange: SearchQueriesNames;
  blogpostsTagFilter?: BlogpostTags;
}

const Search: FC<Props> = ({
  palceholder,
  queryToChange,
  blogpostsTagFilter,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams);

    if (searchTerm) {
      params.set(queryToChange, searchTerm);
    } else {
      params.delete(queryToChange);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSearchTagDelete = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(SearchQueriesNames.BLOGPOSTS_TAG_FILTER);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mx-auto w-full mb-8">
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <div className="relative w-1/2 mx-auto mb-2">
        <input
          className="pl-7 pr-5 py-3 w-full rounded-lg focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-item-bg-dark"
          type="text"
          id="search"
          name="search"
          placeholder={`${palceholder}...`}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={`${
            searchParams.get('query')?.toString() === undefined
              ? ''
              : searchParams.get('query')?.toString()
          }`}
        />
        <IoMdSearch className="absolute top-[13px] left-[6px]" size={18} />
      </div>
      {/* BLogpost search tag */}
      {blogpostsTagFilter ? (
        <SearchTag
          searchTag={blogpostsTagFilter}
          handleSearchTagDelete={handleSearchTagDelete}
        />
      ) : null}
    </div>
  );
};

export default Search;
