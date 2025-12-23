import AddBook from "../../Components/AddBook/AddBook";
import LibBooks from "../../Components/LibBooks/LibBooks";
import { useEffect, useState } from "react";
import { isWorker } from "../../Utils/systemUtils";
import { getAllAuthors } from "../../api/api";

function Library() {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);

  const fetchAuthors = async () => {
    const { data } = await getAllAuthors();
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
      <div className="page-container">
        {isWorker() && (
          <AddBook authors={authors} handleBookAdded={handleBookAdded} />
        )}
        <LibBooks books={books} setBooks={setBooks} />
      </div>
    </>
  );
}

export default Library;
