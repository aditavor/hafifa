import "./Card.scss";

function Card({ data, buttons = [], showIcon }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{data.name}</h3>
        {showIcon && <i className="trash-icon fa-regular fa-trash-can"></i>}
      </div>
      <p className="headers">{data.headers}</p>
      <div className="buttons">
        {buttons.map((btn, index) => (
          <button
            key={index}
            className={"btn"}
            onClick={() => btn.onClick(data.id, data.name)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Card;
