import "./Card.scss";

function Card({ data, buttons = [], onDelete }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{data.name}</h3>
        {onDelete && (
          <i
            className="trash-icon fa-regular fa-trash-can"
            onClick={() => onDelete(data.id, data.name)}
          ></i>
        )}
      </div>
      <p className="headers">{data.headers}</p>
      <div className="buttons">
        {buttons.map((btn, index) => (
          <button
            key={index}
            className={"btn"}
            onClick={() => btn.onClick(data.id)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Card;
