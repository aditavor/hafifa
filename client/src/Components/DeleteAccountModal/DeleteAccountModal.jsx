import Modal from "../Modal/Modal";
import "./DeleteAccountModal.scss";
import { useNavigate } from "react-router-dom";

const DeleteAccountModal = ({
  setOpen,
  handleDelete,
  setDeleteItselfOpen,
  userId,
}) => {
  const navigate = useNavigate();

  const deleteAccount = () => {
    handleDelete(userId);
    setDeleteItselfOpen(false);
    navigate("/login");
    localStorage.clear();
  };

  return (
    <Modal setOpen={setOpen}>
      <div className="warn-wrap">
        <h2>⚠️Delete Your Account⚠️</h2>

        <h4>
          This action is <strong>irreversible</strong>.
        </h4>

        <div className="modal-actions">
          <button onClick={() => setDeleteItselfOpen(false)}>Cancel</button>
          <button className="danger-btn" onClick={() => deleteAccount(userId)}>
            Yes, Log me out and delete my account
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
