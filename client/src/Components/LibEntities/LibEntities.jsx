import SearchBar from "../SearchBar/SearchBar";
import { useState, useMemo } from "react";
import "./LibEntities.scss";
import SelectOptionsBar from "../SelectOptionsBar/SelectOptionsBar";

function LibEntities({ entities, loading, children, sortOptions }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("DEFAULT");

  const filteredEntities = useMemo(
    () => filterEntities(entities, search),
    [entities, search]
  );

  const processedEntities = useMemo(() => {
    let result = filteredEntities;

    if (sortKey && sortOptions?.[sortKey]) {
      result = [...result].sort(sortOptions[sortKey].sortData);
    }

    return result;
  }, [entities, search, sortKey, sortOptions]);

  return (
    <>
      <div className="controls">
        <SearchBar className="search-bar" value={search} onChange={setSearch} />
        {sortOptions && (
          <SelectOptionsBar
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortOptions={sortOptions}
          />
        )}
      </div>
      <div className="container-item">
        {loading ? (
          <p>Loading...</p>
        ) : entities.length > 0 ? (
          processedEntities.length > 0 ? (
            processedEntities.map((book) => children(book))
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
