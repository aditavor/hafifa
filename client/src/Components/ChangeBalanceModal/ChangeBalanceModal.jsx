import { useState } from "react";
import Modal from "../Modal/Modal";
import { toast } from "react-toastify";

function ChangeBalanceModal({ setOpen, usersBalance, addToBalance }) {
  const [error, setError] = useState("");
  const [add, setAdd] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const valueToAdd = Number(add);

    if (!valueToAdd) {
      setError("Enter a value");
      return;
    } else if (valueToAdd + Number(usersBalance) > 2000) {
      setError("Value is out of bounds");
      return;
    } else if (valueToAdd < 0) {
      setError("Invalid value to add");
      return;
    }

    toast.success("Added " + valueToAdd + " to balance ", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
    });

    addToBalance(valueToAdd);
    setAdd(0);
    setOpen(false);
  };

  return (
    <>
      <Modal setOpen={setOpen}>
        <h3>Current balance: {usersBalance}</h3>
        <h4>You can add: {2000 - usersBalance}</h4>

        <form className="simple-form" onSubmit={handleSubmit}>
          <label>
            Enter value to add
            <input
              type="number"
              value={add}
              onFocus={() => setAdd("")}
              onChange={(e) => setAdd(e.target.value)}
            />
          </label>
          {error && <p className="submit-error">{error}</p>}
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </>
  );
}

export default ChangeBalanceModal;
