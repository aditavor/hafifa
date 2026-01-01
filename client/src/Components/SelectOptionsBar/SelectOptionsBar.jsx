import "./SelectOptionsBar.scss";

function SelectOptionsBar({ sortOptions, setSortKey, sortKey }) {
  return (
    <div className="select-wrapper">
      <i className="controlIcon fa-solid fa-chevron-down select-icon"></i>
      <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
        <option value="DEFAULT" disabled hidden>
          {sortOptions.DEFAULT.label}
        </option>
        {Object.entries(sortOptions)
          .filter(([key]) => key !== "DEFAULT")
          .map(([key, option]) => (
            <option key={key} value={key}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
}

export default SelectOptionsBar;
