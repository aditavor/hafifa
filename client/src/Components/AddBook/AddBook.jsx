import "./AddBook.scss";
import { useState } from "react";

function AddBook({ authors, handleBookAdded }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [price, setPrice] = useState("");
  const [pages, setPages] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !authorId || !price || !pages) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          authorId,
          pages: Number(pages),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login error");
        return;
      }

      handleBookAdded(data.book);
      toast.success("Created new book " + name, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (err) {
      setError("Error. please try again");
    }

    setOpen(false);
    clearForm();
  };

  const clearForm = () => {
    setName("");
    setAuthorId("");
    setPages("");
    setPrice("");
    setError("");
  };

  return (
    <>
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
          onClick={() => {
            setOpen(true);
            clearForm();
          }}
        >
          Add Book
        </button>
      </div>
      {open && (
        <div className="add-book-card">
          <div className="modal-overlay" onClick={() => setOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setOpen(false)}>
                ✕
              </button>

              <form className="simple-form" onSubmit={handleSubmit}>
                {error && <p className="submit-error">{error}</p>}
                <label>
                  Enter book name
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

                <label>
                  Enter book price (₪)
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </label>

                <label>
                  Enter book pages
                  <input
                    type="number"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                  />
                </label>

                <label>
                  Select an author
                  <select
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                  >
                    <option value=""></option>
                    {authors.map((author) => (
                      <option key={author.id} value={author.id}>
                        {author.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddBook;
