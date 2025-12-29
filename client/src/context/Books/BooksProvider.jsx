import { useState, useEffect } from "react";
import { BooksContext } from "./BooksContext";
import { getAllBooks } from "../../api/api";

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    const { data } = await getAllBooks();
    setBooks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = (newBook) => {
    setBooks((prev) => [...prev, newBook]);
  };

  const updateBook = (newBook) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === newBook.id ? newBook : book))
    );
  };

  return (
    <BooksContext.Provider
      value={{ books, loading, addBook, updateBook }}
    >
      {children}
    </BooksContext.Provider>
  );
}
