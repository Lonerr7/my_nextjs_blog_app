interface Props {
  searchTag: string;
  handleSearchTagDelete: () => void;
}

const SearchTag: React.FC<Props> = ({ searchTag, handleSearchTagDelete }) => {
  return (
    <div className="flex items-center">
      <p className="mr-4">{searchTag}</p>
      <button onClick={handleSearchTagDelete}>❌</button>
    </div>
  );
};

export default SearchTag;
