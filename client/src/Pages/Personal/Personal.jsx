import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import { toast } from "react-toastify";
import { userId } from "../../Utils/systemUtils";
import { returnBook, usersBooks } from "../../api/api";

function Personal() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const { data, status } = await usersBooks(userId());
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleReturn = async (bookId, bookName) => {
    try {
      const { status } = await returnBook(bookId);

      if (status !== 202) {
        console.error("Failed to return book");
        return;
      }

      handleBookReturned(bookId);

      toast.success("Book " + bookName + " borrowed successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookReturned = (bookId) => {
    setBooks(books.filter((book) => book.id !== bookId));
  };

  return (
    <>
      <div className="page-container">
        <h2 className="title">Books you borrowed:</h2>
        <div className="container">
          <div className="container-item">
            {books.length > 0 ? (
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
