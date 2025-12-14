import SearchBar from "../SearchBar/SearchBar";
import Book from "../Book/Book";
import "./LibBooks.scss";
import { useState, useEffect } from "react";

function LibBooks() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBooks = async () => {
    const res = await fetch("http://localhost:3000/books");
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBorrow = async (bookId, bookName) => {
    const userId = localStorage.getItem("user_id");

    try {
      const res = await fetch(
        "http://localhost:3000/books/" + bookId + "/borrow",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );

      if (!res.ok) {
        console.error("Failed to borrow book");
        return;
      }

      console.log(`Borrowed: ${bookName}`);
    } catch (err) {
      console.error(err);
    }

    fetchBooks();
  };

  return (
    <div className="container">
      <SearchBar value={search} onChange={setSearch} />
      <div className="books">
        {filteredBooks.map((book) => (
          <Book
            key={book.id}
            book={{
              id: book.id,
              name: book.name,
              pages: book.pages,
              userId: book.user_id,
            }}
            onBorrow={handleBorrow}
          />
        ))}
      </div>
    </div>
  );
}

export default LibBooks;
