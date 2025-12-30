import { useState } from "react";
import AddAuthor from "../../Components/AddAuthor/AddAuthor";
import { isWorker } from "../../Utils/systemUtils";
import { addAuthor, deleteAuthor as deleteAuthorServer } from "../../api/api";
import Modal from "../../Components/Modal/Modal";
import { toast } from "react-toastify";
import { useAuthors } from "../../context/Authors/useAuthors";
import { useBooks } from "../../context/Books/useBooks";

function Publishers() {
  const [authorName, setAuthorName] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const {
    authors,
    loading,
    addAuthor: addAuthorCtx,
    deleteAuthor: deleteAuthorClient,
  } = useAuthors();
  const { deleteBooksByAuthor } = useBooks();

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

  const handleDelete = async (authorId, name) => {
    try {
      const { status } = await deleteAuthorServer(authorId);
      if (status !== 200) {
        console.error("Failed to delete author");
        return;
      }
      deleteAuthorClient(authorId);
      deleteBooksByAuthor(authorId);

      toast.success("Author " + name + " deleted successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (err) {
      console.error(err);
    }
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
                {isWorker() && (
                  <i
                    className="trash-icon fa-regular fa-trash-can"
                    onClick={() => handleDelete(author.id, author.name)}
                  ></i>
                )}
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
