import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  setSearch: (state: string) => void;
}

const SearchBox = ({ search, setSearch }: SearchBoxProps) => {
  return (
    <div className={css.searchBox}>
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className={css.input}
        type="text"
        placeholder="Search notes..."
      />
    </div>
  );
};

export default SearchBox;
