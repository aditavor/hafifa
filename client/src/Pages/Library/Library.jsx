import AddBook from "../../Components/AddBook/AddBook";
import { useAuthors } from "../../context/Authors/useAuthors";
import { useBooks } from "../../context/Books/useBooks";
import Card from "../../Components/Card/Card";
import { toast } from "react-toastify";
import { userId, isWorker } from "../../Utils/systemUtils";
import { borrowBook, deleteBook as deleteBookServer } from "../../api/api";
import { useBalance } from "../../context/Balance/useBalance";
import LibEntities from "../../Components/LibEntities/LibEntities";

function Library() {
  const {
    books,
    addBook,
    updateBook,
    loading: booksLoading,
    deleteBook: deleteBookClient,
  } = useBooks();
  const { authors, loading: authorsLoading } = useAuthors();
  const { balance, addToBalance } = useBalance();

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

  const handleDelete = async (bookId, bookName) => {
    try {
      const { status } = await deleteBookServer(bookId);
      if (status !== 200) {
        console.error("Failed to delete book");
        return;
      } 
      deleteBookClient(bookId);

      toast.success("Book " + bookName + " deleted successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const renderBookCard = (book) => (
    <Card
      key={book.id}
      data={{
        id: book.id,
        name: book.name,
        headers: `Pages: ${book.pages}\nPrice: ${book.price}`,
      }}
      onDelete={
        isWorker() && isAvailable(book)
          ? () => handleDelete(book.id, book.name)
          : undefined
      }
      buttons={
        isAvailable(book)
          ? [
              {
                label: "Borrow Book",
                onClick: () =>
                  handleBorrow(book.id, book.name, Number(book.price)),
              },
            ]
          : []
      }
    />
  );

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
        <LibEntities
          entities={books}
          loading={booksLoading}
          children={renderBookCard}
        />
      </div>
    </>
  );
}

export default Library;

const isAvailable = (book) => !book.user_id;
