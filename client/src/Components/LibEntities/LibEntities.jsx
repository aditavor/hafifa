import SearchBar from "../SearchBar/SearchBar";
import { useState, useMemo } from "react";
import "./LibEntities.scss";
import SelectOptionsBar from "../SelectOptionsBar/SelectOptionsBar";

function LibEntities({
  entities,
  loading,
  children,
  sortOptions,
  setSortType,
  setOrderBy,
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("DEFAULT");

  const filteredEntities = useMemo(
    () => filterEntities(entities, search),
    [entities, search]
  );

  return (
    <>
      <div className="controls">
        <SearchBar className="search-bar" value={search} onChange={setSearch} />
        {sortOptions && (
          <SelectOptionsBar
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortOptions={sortOptions}
            setSortType={setSortType}
            setOrderBy={setOrderBy}
          />
        )}
      </div>
      <div className="container-item">
        {loading ? (
          <p>Loading...</p>
        ) : entities.length > 0 ? (
          filteredEntities.length > 0 ? (
            filteredEntities.map((book) => children(book))
          ) : (
            <p>No match results</p>
          )
        ) : (
          <p>No Entities in library</p>
        )}
      </div>
    </>
  );
}

export default LibEntities;

const filterEntities = (entities, search) => {
  return entities.filter((entity) =>
    entity.name.toLowerCase().includes(search.toLowerCase())
  );
};
