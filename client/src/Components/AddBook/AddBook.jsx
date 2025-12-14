import "./AddBook.scss";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const navigate = useNavigate();

  return (
    <div className="catalog-header">
      <div className="text-section">
        <h2>Library Catalog</h2>
        <p>
          Track, manage, and-explore, your collection with reasonable
          components.
        </p>
      </div>

      <button
        className="add-btn"
        onClick={() => navigate("/add-book")} 
      >
        Add Book
      </button>
    </div>
  );
}

export default AddBook;
