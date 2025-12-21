function AddAuthorModal({error, setOpen, authorName, setAuthorName, handleSubmit}) {
  return (
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
  );
}

export default AddAuthorModal;
