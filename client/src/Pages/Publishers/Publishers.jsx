import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Publishers.scss";

function Publishers() {
  const [authors, setAuthors] = useState([]);
  const [authorName, setAuthorName] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

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

      toast.success("Added new author " + name, {
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
      <Navbar />
      <div className="page-container">
        <h2 className="title" >Library publishers:</h2>
        <ul className="list">
          {authors.map((author) => (
            <li key={author.id} className="list-item">
              <span>{author.name}</span>
            </li>
          ))}
          {localStorage.getItem("is_worker") === "true" && (
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
          <div className="modal-overlay" onClick={() => setOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setOpen(false)}>
                ✕
              </button>

              <form className="simple-form" onSubmit={handleSubmit}>
                {error && <p className="submit-error">{error}</p>}
                <label>
                  Enter author name
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                </label>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Publishers;
