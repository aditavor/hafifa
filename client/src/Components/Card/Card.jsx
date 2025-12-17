import "./Card.scss";

function Card({ data, onClickBtn, btnData, showIcon, showBtn }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{data.name}</h3>
        {showIcon && <i className="trash-icon fa-regular fa-trash-can"></i>}
      </div>
      <p className="headers">{data.headers}</p>
      {showBtn && (
        <button
          className="borrow-btn"
          onClick={() => onClickBtn(data.id, data.name)}
        >
          {btnData}
        </button>
      )}
    </div>
  );
}

export default Card;
