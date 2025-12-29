import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { userId, isWorker } from "../../Utils/systemUtils";
import { borrowBook } from "../../api/api";
import { useBalance } from "../../context/Balance/useBalance";

function LibBooks({ books, loading, updateBook }) {
  const [search, setSearch] = useState("");
  const { balance, addToBalance } = useBalance();

  const filteredBooks = useMemo(
    () => filterBooks(books, search),
    [books, search]
  );

  const handleBorrow = async (bookId, bookName, bookPrice) => {
    const id = userId();

    try {
      if (balance < bookPrice) {
        console.log(balance, bookPrice);
        toast.error("You cant borrow book " + bookName, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
        return;
      }
      const { data, status } = await borrowBook(bookId, id);

      if (status !== 202) {
        console.error("Failed to borrow book");
        return;
      }

      updateBook(data.book);
      addToBalance(-1 * data.book.price);

      toast.success("Book " + data.book.name + " borrowed successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      const { data, status } = await borrowBook(bookId, id);

      if (status !== 202) {
        console.error("Failed to delete book");
        return;
      }

      updateBook(data.book);

      toast.success("Book " + data.book.name + " borrowed successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <SearchBar value={search} onChange={setSearch} />
      <div className="container-item">
        {loading ? (
          <p>Loading...</p>
        ) : books.length > 0 ? (
          filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <Card
                key={book.id}
                data={{
                  id: book.id,
                  name: book.name,
                  headers: "Pages: " + book.pages + "\nPrice: " + book.price,
                }}
                btnData={"Borrow Book"}
                onClickBtn={() =>
                  handleBorrow(book.id, book.name, Number(book.price))
                }
                showIcon={isWorker() && isAvailable(book)}
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

const filterBooks = (books, search) => {
  return books.filter((book) =>
    book.name.toLowerCase().includes(search.toLowerCase())
  );
};

const isAvailable = (book) => !book.user_id;
