import "./AddBook.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addPost } from "../../api/api";
import Modal from "../Modal/Modal";

function AddBook({ authors, loading, handleBookAdded, fetchData }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [price, setPrice] = useState(0);
  const [pages, setPages] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      await fetchData();
    };

    fetch();
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !authorId || !price || !pages) {
      setError("Please fill all fields");
      return;
    }

    const { data, status } = await addPost(name, price, authorId, pages);

    if (status !== 201) {
      setError(data.message || "Adding book error");
      return;
    }

    handleBookAdded(data.book);

    toast.success("Created new book " + name, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
    });

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
        <Modal setOpen={setOpen}>
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
                {loading ? (
                  <option value="">Loading...</option>
                ) : authors.length === 0 ? (
                  <option value="">No publishers in library</option>
                ) : (
                  <>
                    <option value=""></option>
                    {authors.map((author) => (
                      <option key={author.id} value={author.id}>
                        {author.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default AddBook;
