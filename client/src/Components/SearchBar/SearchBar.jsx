import "./SearchBar.scss";

function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar">
      <i className="searchIcon fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
