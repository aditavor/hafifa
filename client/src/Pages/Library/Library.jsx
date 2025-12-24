import AddBook from "../../Components/AddBook/AddBook";
import LibBooks from "../../Components/LibBooks/LibBooks";
import { useEffect, useState } from "react";
import { isWorker } from "../../Utils/systemUtils";
import { getAllAuthors } from "../../api/api";
import { useBooks } from "../../context/Books/useBooks";

function Library() {
  const [authors, setAuthors] = useState([]);
  const { books, addBook, updateBook, loading } = useBooks();

  const fetchAuthors = async () => {
    const { data } = await getAllAuthors();
    setAuthors(data);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <>
      <div className="page-container">
        {isWorker() && (
          <AddBook
            loading={loading}
            authors={authors}
            handleBookAdded={addBook}
          />
        )}
        <LibBooks books={books} updateBook={updateBook} />
      </div>
    </>
  );
}

export default Library;
