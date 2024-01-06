interface Props {
  searchTag: string;
}

const SearchTag: React.FC<Props> = ({ searchTag }) => {
  return (
    <div className="flex items-center">
      <p className="mr-4">{searchTag}</p>
      <button>❌</button>
    </div>
  );
};

export default SearchTag;
