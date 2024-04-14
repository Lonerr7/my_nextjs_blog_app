'use client';

import { BlogpostTags } from '@/types/blogTypes';
import { SearchQueriesNames } from '@/types/requestTypes';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { useDebouncedCallback } from 'use-debounce';
import SearchTag from './SearchTag';

interface Props {
  customInputContainerClassName?: string;
  palceholder: string;
  queryToChange: SearchQueriesNames;
  blogpostsTagFilter?: BlogpostTags;
}

const Search: FC<Props> = ({
  customInputContainerClassName,
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
      params.set('page', '1');
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
    <div className="mx-auto w-full mb-8 xsm:mb-4">
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <div
        className={`relative w-1/2 mx-auto lg:w-full ${customInputContainerClassName}`}
      >
        <input
          className="search-input pl-7 pr-5 py-3 mb-2"
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

        {blogpostsTagFilter ? (
          <SearchTag
            searchTag={blogpostsTagFilter}
            handleSearchTagDelete={handleSearchTagDelete}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Search;
