import "./SelectOptionsBar.scss";

function SelectOptionsBar({ sortOptions, setSortKey, sortKey }) {
  return (
    <div className="select-wrapper">
      <i className="controlIcon fa-solid fa-chevron-down select-icon"></i>
      <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
        <option value=""></option>
        {Object.entries(sortOptions).map(([key, option]) => (
          <option key={key} value={key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectOptionsBar;
