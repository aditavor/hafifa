import AddBook from "../../Components/AddBook/AddBook";
import Navbar from "../../Components/Navbar/Navbar";
import LibBooks from "../../Components/LibBooks/LibBooks";
import "./Home.scss";
import { useEffect, useState } from "react";

function Home() {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);

  const fetchAuthors = async () => {
    const res = await fetch("http://localhost:3000/authors");
    const data = await res.json();
    setAuthors(data);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleBookAdded = (newBook) => {
    setBooks((prev) => [...prev, newBook]);
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        {localStorage.getItem("is_worker") === "true" && (
          <AddBook authors={authors} handleBookAdded={handleBookAdded}/>
        )}
        <LibBooks books={books} setBooks={setBooks} />
      </div>
    </>
  );
}

export default Home;
