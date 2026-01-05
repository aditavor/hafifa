import { useState, useEffect } from "react";
import { AuthorsContext } from "./AuthorsContext";
import { getAllAuthors } from "../../api/api";

export function AuthorsProvider({ children }) {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("ASC");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [total, setTotal] = useState(0);

  const fetchAuthors = async () => {
    setLoading(true);
    const { data } = await getAllAuthors(orderBy, sortType, page, limit);
    setAuthors(data.rows);
    setTotal(data.count);
    setLoading(false);
  };

  useEffect(() => {
    fetchAuthors();
  }, [sortType, orderBy, page]);

  const totalPages = Math.ceil(total / limit);

  const addAuthor = (newAuthor) => {
    setAuthors((prev) => [...prev, newAuthor]);
  };

  const addRevenue = (authorId, value) => {
    setAuthors((prev) =>
      prev.map((author) =>
        author.id === authorId
          ? { ...author, revenue: Number(author.revenue) + Number(value) }
          : author
      )
    );
  };

  const deleteAuthor = (authorId) => {
    setAuthors((prev) => prev.filter((author) => author.id !== authorId));
  };

  return (
    <AuthorsContext.Provider
      value={{
        authors,
        loading,
        fetchAuthors,
        addAuthor,
        deleteAuthor,
        addRevenue,
        totalPages,
        page,
        setPage,
        setSortType,
        setOrderBy,
      }}
    >
      {children}
    </AuthorsContext.Provider>
  );
}
