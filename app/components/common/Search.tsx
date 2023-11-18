'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';
import { IoMdSearch } from 'react-icons/io';

interface Props {
  palceholder: string;
}

const Search: FC<Props> = ({ palceholder }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);

    if (searchTerm) {
      params.set('query', searchTerm);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mx-auto w-full mb-8">
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <div className="relative w-1/2 mx-auto">
        <input
          className="pl-7 pr-5 py-3 w-full rounded-lg"
          type="text"
          id="search"
          name="search"
          placeholder={`${palceholder}...`}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={`${searchParams.get('query')?.toString()}` && ''}
        />
        <IoMdSearch className="absolute top-[13px] left-[3px]" size={18} />
      </div>
    </div>
  );
};

export default Search;
