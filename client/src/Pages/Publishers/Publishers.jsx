import { useEffect, useState } from "react";
import AddAuthor from "../../Components/AddAuthor/AddAuthor";
import { isWorker } from "../../Utils/systemUtils";
import { addAuthor } from "../../api/api";
import Modal from "../../Components/Modal/Modal";
import { toast } from "react-toastify";
import { useAuthors } from "../../context/Authors/useAuthors";

function Publishers() {
  const [authorName, setAuthorName] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const { authors, loading, addAuthor: addAuthorCtx } = useAuthors();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!authorName) {
      setError("Please fill author data");
      return;
    }

    const { data, status } = await addAuthor(authorName);

    if (status !== 201) {
      setError(data.message || "Add author error");
      return;
    }

    toast.success("Added new author " + authorName, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
    });

    addAuthorCtx(data.author);
    setOpen(false);
    setAuthorName("");
    setError("");
  };

  return (
    <>
      <div className="page-container">
        <h2 className="title">Library publishers:</h2>
        <ul className="list">
          {loading ? (
            <p>Loading...</p>
          ) : authors.length !== 0 ? (
            authors.map((author) => (
              <li key={author.id} className="list-item">
                <span>{author.name}</span>
              </li>
            ))
          ) : (
            <p>No Publishers in library</p>
          )}
          {isWorker() && (
            <li
              className="add-btn"
              onClick={() => {
                setOpen(true);
                setAuthorName("");
                setError("");
              }}
            >
              + Add A Publisher
            </li>
          )}
        </ul>
        {open && (
          <Modal setOpen={setOpen}>
            <AddAuthor
              error={error}
              setOpen={setOpen}
              authorName={authorName}
              setAuthorName={setAuthorName}
              handleSubmit={handleSubmit}
            />
          </Modal>
        )}
      </div>
    </>
  );
}

export default Publishers;
