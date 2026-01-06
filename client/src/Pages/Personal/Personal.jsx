import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import { toast } from "react-toastify";
import { userId } from "../../Utils/systemUtils";
import { returnBook, getUsersBooks } from "../../api/api";
import { useBooks } from "../../context/Books/useBooks";
import ChangeBalanceModal from "../../Components/ChangeBalanceModal/ChangeBalanceModal";
import { useBalance } from "../../context/Balance/useBalance";

function Personal() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { updateBook } = useBooks();
  const { balance, addToBalance } = useBalance();

  const fetchBooks = async () => {
    setLoading(true);

    const { data } = await getUsersBooks(userId());
    setBooks(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleReturn = async (bookId) => {
    try {
      const { data, status } = await returnBook(bookId);

      if (status !== 202) {
        console.error("Failed to return book");
        return;
      }

      handleBookReturned(data.book);

      toast.success("Book " + data.book.name + " returned successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookReturned = (returnedBook) => {
    updateBook(returnedBook);
    setBooks(books.filter((book) => book.id !== returnedBook.id));
  };

  return (
    <div className="page-container">
      <h2 className="title">Books you borrowed:</h2>
      <div className="container">
        <div className="container-item">
          {loading ? (
            <p>Loading...</p>
          ) : books.length > 0 ? (
            books.map((book) => (
              <Card
                key={book.id}
                data={{
                  id: book.id,
                  name: book.name,
                  headers: "Borrow Date: " + book.borrow_date,
                }}
                buttons={[
                  {
                    label: "Return Book",
                    onClick: handleReturn,
                  },
                ]}
              />
            ))
          ) : (
            <p>You didnt borrowed any book</p>
          )}
        </div>
      </div>
      <button className="lib-btn" onClick={() => setOpen(true)}>
        Add To Balance
      </button>
      {open && (
        <ChangeBalanceModal
          addToBalance={addToBalance}
          usersBalance={balance}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}

export default Personal;
