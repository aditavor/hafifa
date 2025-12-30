import "./DeleteAccountModal.scss";

const DeleteAccountModal = ({ onConfirm, onCancel, userId }) => {
  return (
    <div className="warn-wrap">
      <h2>⚠️Delete Your Own Account⚠️</h2>

      <h4>
        This action is <strong>irreversible</strong>.
      </h4>

      <div className="modal-actions">
        <button onClick={onCancel}>Cancel</button>
        <button className="danger-btn" onClick={() => onConfirm(userId)}>
          Yes, Log me out and delete my account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
