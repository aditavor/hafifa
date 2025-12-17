import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await fetch("http://localhost:3000/books/mostPopular");
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="title">Welcome to Bookod</h1>
        <button className="to-library" onClick={() => navigate("/library")}>
          View library's books
        </button>
        <h3 className="title">Our Bestsellers:</h3>
        <ul className="list">
          {books.length !== 0 ? (
            books.map((book) => (
              <li key={book.id} className="list-item">
                <div>
                  <h3>{book.name}</h3>
                  <p>Borrows: {book.borrows}</p>
                </div>
              </li>
            ))
          ) : (
            <p>No Books</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default Home;
