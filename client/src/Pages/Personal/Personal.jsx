import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Card from "../../Components/Card/Card";

function Personal() {
  const [books, setBooks] = useState([]);
  const userId = localStorage.getItem("user_id");

  const fetchBooks = async () => {
    let res = await fetch("http://localhost:3000/users/" + userId + "/books");
    let data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleReturn = async (bookId, bookName) => {
    try {
      const res = await fetch(
        "http://localhost:3000/books/" + bookId + "/return",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        console.error("Failed to return book");
        return;
      }

      console.log(`Returned: ${bookName}`);
    } catch (err) {
      console.error(err);
    }

    fetchBooks();
  };

  return (
    <>
      <Navbar />
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
