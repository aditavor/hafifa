import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import { toast } from "react-toastify";
import { calcTotalPages, userId } from "../../Utils/systemUtils";
import { returnBook, getUsersBooks } from "../../api/api";
import { useBooks } from "../../context/Books/useBooks";
import ChangeBalanceModal from "../../Components/ChangeBalanceModal/ChangeBalanceModal";
import { useBalance } from "../../context/Balance/useBalance";
import LibEntities from "../../Components/LibEntities/LibEntities";
import { PERSONAL_SORT_OPTIONS } from "../../Utils/sortUtils";

function Personal() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { updateBook } = useBooks();
  const { balance, addToBalance } = useBalance();
  const [sortType, setSortType] = useState("ASC");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(1);
  const LIMIT = 9;
  const [total, setTotal] = useState(0);

  const fetchBooks = async (limit = undefined) => {
    setLoading(true);

    const { data } = await getUsersBooks(
      userId(),
      orderBy,
      sortType,
      page,
      limit
    );
    setBooks(data.rows);
    setTotal(data.count);

    setLoading(false);
  };

  const totalPages = calcTotalPages(total, LIMIT);

  useEffect(() => {
    fetchBooks(LIMIT);
  }, [orderBy, sortType, page]);

  useEffect(() => {
    setPage(1);
  }, [sortType, orderBy]);

  const handleReturn = async (bookId) => {
    try {
      const { data, status } = await returnBook(bookId);

      if (status !== 202) {
        console.error("Failed to return book");
        return;
      }

      handleBookReturned(data.book);

      toast.success("Book " + data.book.name + " returned successfully", {
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
        headers: "Borrow Date: " + book.borrow_date,
      }}
      buttons={[
        {
          label: "Return Book",
          onClick: handleReturn,
        },
      ]}
    />
  );

  const handleBookReturned = (returnedBook) => {
    updateBook(returnedBook);
    fetchBooks(LIMIT);
  };

  return (
    <div className="page-container">
      <h2 className="title">Books you borrowed:</h2>
      <div className="container">
        <LibEntities
          entities={books}
          loading={loading}
          children={renderBookCard}
          sortOptions={PERSONAL_SORT_OPTIONS}
          setSortType={setSortType}
          setOrderBy={setOrderBy}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          fetchData={fetchBooks}
          limit={LIMIT}
        />
      </div>
      <button className="lib-btn" onClick={() => setOpen(true)}>
        Add To Balance
      </button>
      {open && (
        <ChangeBalanceModal
          addToBalance={addToBalance}
          usersBalance={balance}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}

export default Personal;
