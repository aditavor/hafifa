function Modal({ setOpen, children }) {
  return (
    <div className="modal-overlay" onClick={() => setOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          ✕
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
