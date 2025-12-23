import { useEffect, useState } from "react";
import "./Publishers.scss";
import AddAuthorModal from "../../Components/AddAuthorModal/AddAuthorModal";
import { isWorker } from "../../Utils/systemUtils";
import { addAuthor, getAllAuthors } from "../../api/api";

function Publishers() {
  const [authors, setAuthors] = useState([]);
  const [authorName, setAuthorName] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAuthors = async () => {
    setLoading(true);

    const { data } = await getAllAuthors();
    setAuthors(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

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

    handleAuthorAdded(data.author);

    toast.success("Added new author " + authorName, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
    });

    setOpen(false);
    setAuthorName("");
    setError("");
  };

  const handleAuthorAdded = (newAuthor) => {
    setAuthors((prev) => [...prev, newAuthor]);
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
          <AddAuthorModal
            error={error}
            setOpen={setOpen}
            authorName={authorName}
            setAuthorName={setAuthorName}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
}

export default Publishers;
