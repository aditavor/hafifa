import { useEffect, useState } from "react";
import "./Publishers.scss";
import AddAuthorModal from "../../Components/AddAuthorModal/AddAuthorModal";
import { isWorker } from "../../Utils/systemUtils";

function Publishers() {
  const [authors, setAuthors] = useState([]);
  const [authorName, setAuthorName] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const fetchAuthors = async () => {
    const res = await fetch("http://localhost:3000/authors");
    const data = await res.json();
    setAuthors(data);
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

    try {
      const res = await fetch("http://localhost:3000/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: authorName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Add author error");
        return;
      }

      handleAuthorAdded(data.author);

      toast.success("Added new author " + authorName, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (err) {
      setError("Error. please try again");
    }

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
          {authors.length !== 0 ? (
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
