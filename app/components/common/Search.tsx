import { FC } from 'react';
import { IoMdSearch } from 'react-icons/io';

interface Props {
  palceholder: string;
}

const Search: FC<Props> = ({ palceholder }) => {
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
        />
        <IoMdSearch className="absolute top-[13px] left-[3px]" size={18} />
      </div>
    </div>
  );
};

export default Search;
