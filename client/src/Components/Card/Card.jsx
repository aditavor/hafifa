import "./Card.scss";

function Card({ data, onBorrow, isBook }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{data.name}</h3>
        {isBook && localStorage.getItem("is_worker") === "true" && (
          <i className="trash-icon fa-regular fa-trash-can"></i>
        )}
      </div>
      <p className="headers">{data.headers}</p>
      {isBook && data.userId === null && (
        <button
          className="borrow-btn"
          onClick={() => onBorrow(data.id, data.name)}
        >
          Borrow Book
        </button>
      )}
    </div>
  );
}

export default Card;
