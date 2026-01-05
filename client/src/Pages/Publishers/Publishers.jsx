import { useState } from "react";
import AddAuthor from "../../Components/AddAuthor/AddAuthor";
import { isWorker } from "../../Utils/systemUtils";
import { addAuthor, deleteAuthor as deleteAuthorServer } from "../../api/api";
import { toast } from "react-toastify";
import { useAuthors } from "../../context/Authors/useAuthors";
import { useBooks } from "../../context/Books/useBooks";
import LibEntities from "../../Components/LibEntities/LibEntities";
import { AUTHOR_SORT_OPTIONS } from "../../Utils/sortUtils";
import Pagination from "../../Components/Pagination/Pagination";

function Publishers() {
  const [authorName, setAuthorName] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const {
    authors,
    loading,
    fetchAuthors,
    setOrderBy,
    setSortType,
    setPage,
    totalPages,
    page,
  } = useAuthors();
  const { fetchBooks } = useBooks();

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

    toast.success("Adinovich: new author " + authorName, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
    });

    fetchAuthors();
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
      fetchAuthors();
      fetchBooks();

      toast.success("Author " + name + " deleted successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const renderAuthorList = (author) => (
    <li key={author.id} className="list-item">
      <span>
        <strong>{author.name}</strong>
      </span>
      <span>revenue: {author.revenue}</span>
      {isWorker() && (
        <i
          className="trash-icon fa-regular fa-trash-can"
          onClick={() => handleDelete(author.id, author.name)}
        ></i>
      )}
    </li>
  );

  return (
    <div className="page-container">
      <h2 className="title">Library publishers:</h2>
      <ul className="list">
        <LibEntities
          entities={authors}
          loading={loading}
          children={renderAuthorList}
          sortOptions={AUTHOR_SORT_OPTIONS}
          setOrderBy={setOrderBy}
          setSortType={setSortType}
        />

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
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      {open && (
        <AddAuthor
          error={error}
          setOpen={setOpen}
          authorName={authorName}
          setAuthorName={setAuthorName}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default Publishers;
