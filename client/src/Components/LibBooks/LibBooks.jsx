import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { userId, isWorker } from "../../Utils/systemUtils";
import { getAllBooks, borrowBook } from "../../api/api";

function LibBooks({ books, setBooks }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);

    const { data, status } = await getAllBooks();
    if (status === 200) {
      setBooks(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = useMemo(
    () => filerBooks(books, search),
    [books, search]
  );

  const isAvailable = (book) => !book.user_id;

  const handleBorrow = async (bookId, bookName) => {
    const id = userId();

    try {
      const { data, status } = await borrowBook(bookId, id);

      if (status !== 202) {
        console.error("Failed to borrow book");
        return;
      }

      handleBookBorrowed(data.book);

      toast.success("Book " + data.book.name + " borrowed successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookBorrowed = (newBook) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === newBook.id ? newBook : book))
    );
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <SearchBar value={search} onChange={setSearch} />
      <div className="container-item">
        {books.length > 0 ? (
          filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <Card
                key={book.id}
                data={{
                  id: book.id,
                  name: book.name,
                  headers: "Pages: " + book.pages,
                }}
                btnData={"Borrow Book"}
                onClickBtn={handleBorrow}
                showIcon={isWorker()}
                showBtn={isAvailable(book)}
                isBook={true}
              />
            ))
          ) : (
            <p>No match results</p>
          )
        ) : (
          <p>No Books in library</p>
        )}
      </div>
    </div>
  );
}

export default LibBooks;

const filerBooks = (books, search) => {
  return books.filter((book) =>
    book.name.toLowerCase().includes(search.toLowerCase())
  );
};
