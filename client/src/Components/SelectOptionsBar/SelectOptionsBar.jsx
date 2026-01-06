import "./SelectOptionsBar.scss";

function SelectOptionsBar({
  sortOptions,
  setSortKey,
  sortKey,
  setSortType,
  setOrderBy,
}) {
  const onChange = (e) => {
    setSortKey(e.target.value);
    setSortType(sortOptions[e.target.value].sortType);
    setOrderBy(sortOptions[e.target.value].orderBy);
  };

  return (
    <div className="select-wrapper">
      <i className="controlIcon fa-solid fa-chevron-down select-icon"></i>
      <select value={sortKey} onChange={onChange}>
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
