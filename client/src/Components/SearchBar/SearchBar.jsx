import { useState } from "react";
import "./SearchBar.scss";

function SearchBar({ placeholder = "Search...", onSearch }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className="searchbar">
      <i className="searchIcon fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
