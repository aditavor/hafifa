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

  const deleteBook = (bookId) => {
    setBooks((prev) => prev.filter((book) => book.id !== bookId));
  };

  const deleteBooksByAuthor = (authorId) => {
    setBooks((prev) =>
      prev.filter((book) => Number(book.author_id) !== Number(authorId))
    );
  };

  return (
    <BooksContext.Provider
      value={{ books, loading, addBook, updateBook, deleteBook, deleteBooksByAuthor }}
    >
      {children}
    </BooksContext.Provider>
  );
}
