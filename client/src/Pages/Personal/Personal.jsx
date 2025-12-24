import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import { toast } from "react-toastify";
import { userId } from "../../Utils/systemUtils";
import { returnBook, getUsersBooks } from "../../api/api";
import { useBooks } from "../../context/Books/useBooks";

function Personal() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { updateBook } = useBooks();

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

      toast.success("Book " + data.book.name + " borrowed successfully", {
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
    <>
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
                  btnData={"Return Book"}
                  onClickBtn={handleReturn}
                  showIcon={false}
                  showBtn={true}
                />
              ))
            ) : (
              <p>You didnt borrowed any book</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Personal;
