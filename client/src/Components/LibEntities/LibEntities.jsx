import SearchBar from "../SearchBar/SearchBar";
import { useState, useMemo, useEffect } from "react";
import "./LibEntities.scss";
import SelectOptionsBar from "../SelectOptionsBar/SelectOptionsBar";
import Pagination from "../Pagination/Pagination";

function LibEntities({
  entities,
  loading,
  children,
  sortOptions,
  setSortType,
  setOrderBy,
  page,
  totalPages,
  onPageChange,
  fetchData,
  limit,
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("DEFAULT");

  useEffect(() => {
    const fetch = async (limit) => {
      await fetchData(search === "" ? limit : undefined);
    };

    fetch(limit);
  }, [search === ""]);

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

      {search === "" && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}

export default LibEntities;

const filterEntities = (entities, search) => {
  return entities.filter((entity) =>
    entity.name.toLowerCase().includes(search.toLowerCase())
  );
};
