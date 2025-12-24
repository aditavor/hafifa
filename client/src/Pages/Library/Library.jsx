import AddBook from "../../Components/AddBook/AddBook";
import LibBooks from "../../Components/LibBooks/LibBooks";
import { isWorker } from "../../Utils/systemUtils";
import { useAuthors } from "../../context/Authors/useAuthors";
import { useBooks } from "../../context/Books/useBooks";

function Library() {
  const { books, addBook, updateBook, loading: booksLoading } = useBooks();
  const { authors, loading: authorsLoading } = useAuthors();

  return (
    <>
      <div className="page-container">
        {isWorker() && (
          <AddBook
            loading={authorsLoading}
            authors={authors}
            handleBookAdded={addBook}
          />
        )}
        <LibBooks
          books={books}
          updateBook={updateBook}
          loading={booksLoading}
        />
      </div>
    </>
  );
}

export default Library;
