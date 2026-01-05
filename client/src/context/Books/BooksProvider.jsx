import { useState, useEffect } from "react";
import { BooksContext } from "./BooksContext";
import { getAllBooks } from "../../api/api";
import { calcTotalPages } from "../../Utils/systemUtils";

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [sortType, setSortType] = useState("ASC");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 9;
  const [total, setTotal] = useState(0);

  const fetchBooks = async () => {
    setLoading(true);
    const { data } = await getAllBooks(orderBy, sortType, page, limit);
    setBooks(data.rows);
    setTotal(data.count);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, [orderBy, sortType, page]);

  useEffect(() => {
    setPage(1);
  }, [sortType, orderBy]);

  const totalPages = calcTotalPages(total, limit);

  const updateBook = (newBook) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === newBook.id ? newBook : book))
    );
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        loading,
        updateBook,
        fetchBooks,
        setSortType,
        setOrderBy,
        page,
        totalPages,
        setPage,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
