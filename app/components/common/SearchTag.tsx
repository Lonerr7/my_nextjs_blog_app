import { ImCross } from 'react-icons/im';

interface Props {
  searchTag: string;
  handleSearchTagDelete: () => void;
}

const SearchTag: React.FC<Props> = ({ searchTag, handleSearchTagDelete }) => {
  return (
    <div className="inline-flex items-center blogpost-tag">
      <p className="mr-2">{searchTag}</p>
      <button onClick={handleSearchTagDelete}>
        <ImCross className="text-red-500" size={10} />
      </button>
    </div>
  );
};

export default SearchTag;
