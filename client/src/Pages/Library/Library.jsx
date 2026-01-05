import AddBook from "../../Components/AddBook/AddBook";
import { useAuthors } from "../../context/Authors/useAuthors";
import { useBooks } from "../../context/Books/useBooks";
import Card from "../../Components/Card/Card";
import { toast } from "react-toastify";
import { userId, isWorker } from "../../Utils/systemUtils";
import {
  borrowBook,
  deleteBook as deleteBookServer,
  addRevenue as addRevenueServer,
} from "../../api/api";
import { useBalance } from "../../context/Balance/useBalance";
import LibEntities from "../../Components/LibEntities/LibEntities";
import { BOOK_SORT_OPTIONS } from "../../Utils/sortUtils";
import Pagination from "../../Components/Pagination/Pagination";

function Library() {
  const {
    books,
    fetchBooks,
    updateBook,
    loading: booksLoading,
    setSortType,
    setOrderBy,
    page,
    totalPages,
    setPage,
  } = useBooks();
  const {
    authors,
    loading: authorsLoading,
    addRevenue: addRevenueClient,
  } = useAuthors();
  const { balance, addToBalance } = useBalance();

  const handleBorrow = async (bookId, bookName, bookPrice) => {
    const id = userId();

    try {
      if (balance < bookPrice) {
        toast.error("You cant borrow book " + bookName, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
        return;
      }
      const { data: borrowData, status: borrowStatus } = await borrowBook(
        bookId,
        id
      );

      if (borrowStatus !== 202) {
        console.error("Failed to borrow book");
        return;
      }

      addRevenueClient(borrowData.book.author_id, borrowData.book.price);
      updateBook(borrowData.book);
      addToBalance(-1 * borrowData.book.price);

      const { status: addRevenueStatus } = await addRevenueServer(
        borrowData.book.author_id,
        borrowData.book.price
      );

      if (addRevenueStatus !== 202) {
        console.error("Failed to borrow book");
        return;
      }

      toast.success("Book " + borrowData.book.name + " borrowed successfully", {
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
      fetchBooks();

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
    <div className="page-container">
      {isWorker() && (
        <AddBook
          loading={authorsLoading}
          authors={authors}
          handleBookAdded={fetchBooks}
        />
      )}

      <div className="container">
        <LibEntities
          entities={books}
          loading={booksLoading}
          children={renderBookCard}
          sortOptions={BOOK_SORT_OPTIONS}
          setSortType={setSortType}
          setOrderBy={setOrderBy}
        />
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default Library;

const isAvailable = (book) => !book.user_id;
