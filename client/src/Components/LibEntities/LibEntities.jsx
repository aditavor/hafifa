import SearchBar from "../SearchBar/SearchBar";
import { useState, useMemo } from "react";

function LibEntities({ entities, loading, children }) {
  const [search, setSearch] = useState("");

  const filteredEntities = useMemo(
    () => filterEntities(entities, search),
    [entities, search]
  );

  return (
    <div className="container">
      <SearchBar value={search} onChange={setSearch} />
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
    </div>
  );
}

export default LibEntities;

const filterEntities = (entities, search) => {
  return entities.filter((entity) =>
    entity.name.toLowerCase().includes(search.toLowerCase())
  );
};
