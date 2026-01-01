import Modal from "../Modal/Modal";

function AddAuthor({
  error,
  setOpen,
  authorName,
  setAuthorName,
  handleSubmit,
}) {
  return (
    <Modal setOpen={setOpen}>
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
    </Modal>
  );
}

export default AddAuthor;
