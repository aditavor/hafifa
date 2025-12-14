import "./Book.scss";

function Book({ book, onBorrow }) {
  return (
    <div className="book-card">
      <div className="book-header">
        <h3>{book.name}</h3>
        <i className="trash-icon fa-regular fa-trash-can"></i>
      </div>
      <p className="pages">Pages: {book.pages}</p>
      {book.userId === null && (
        <button className="borrow-btn" onClick={() => onBorrow(book.id, book.name)}>
          Borrow Book
        </button>
      )}
    </div>
  );
}

export default Book;
