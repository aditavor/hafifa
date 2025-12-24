function AddAuthor({ error, authorName, setAuthorName, handleSubmit }) {
  return (
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
  );
}

export default AddAuthor;
