import { useEffect, useState } from "react";
import {
  deleteUser,
  getAllUsers,
  getUserstimeoutBooks,
  updateBalance,
} from "../../api/api";
import { userId } from "../../Utils/systemUtils";
import Card from "../../Components/Card/Card";
import Modal from "../../Components/Modal/Modal";
import ChangeBalanceModal from "../../Components/ChangeBalanceModal/ChangeBalanceModal";
import { useBalance } from "../../context/Balance/useBalance";
import { toast } from "react-toastify";
import { userId as loggedUser } from "../../Utils/systemUtils";
import LibEntities from "../../Components/LibEntities/LibEntities";
import DeleteAccountModal from "../../Components/DeleteAccountModal/DeleteAccountModal";
import { USER_SORT_OPTIONS } from "../../Utils/sortUtils";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addBalanceOpen, setAddBalanceOpen] = useState(false);
  const [userToAdd, setUserToAdd] = useState({});
  const [usersBookOpen, setUsersBookOpen] = useState(false);
  const [openUsersBooks, setOpenUsersBooks] = useState([]);
  const [deleteItselfOpen, setDeleteItselfOpen] = useState(false);
  const { addToBalance } = useBalance();

  const fetchCustomers = async () => {
    setLoading(true);

    const { data } = await getAllUsers();
    setCustomers(data);

    setLoading(false);
  };

  const viewUserBooks = async (userId) => {
    setLoading(true);

    setUsersBookOpen(true);
    const { data: books } = await getUserstimeoutBooks(userId);
    setOpenUsersBooks(books);

    setLoading(false);
  };

  const manageDeleteUser = (userId, name) => {
    const isSelf = userId === Number(loggedUser());

    if (isSelf) {
      setDeleteItselfOpen(true);
    } else {
      handleDelete(userId, name);
    }
  };

  const handleDelete = async (userId, name) => {
    try {
      const { status } = await deleteUser(userId);

      if (status !== 200) {
        console.error("Failed to delete user");
        return;
      }

      setCustomers((prev) => prev.filter((user) => user.id !== userId));

      toast.success(
        (name ? "User " + name : "Your own account ") + "deleted successfully",
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const addToBalanceModal = async (value) => {
    const newBalance = (Number(userToAdd.balance) ?? 0) + Number(value);
    setCustomers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userToAdd.id ? { ...user, balance: newBalance } : user
      )
    );

    if (userToAdd.id === Number(userId())) {
      addToBalance(value);
    } else {
      await updateBalance(userToAdd.id, newBalance);
    }
  };

  const renderBookCard = (customer) => (
    <Card
      key={customer.id}
      data={{
        id: customer.id,
        name: customer.name,
        headers: "Email: " + customer.email + " \nBalance: " + customer.balance,
      }}
      onDelete={manageDeleteUser}
      buttons={[
        {
          label: "Add ₪",
          onClick: () => {
            setAddBalanceOpen(true);
            setUserToAdd(customer);
          },
        },
        ...(customer.isLate
          ? [
              {
                label: "View Late Books",
                onClick: () => viewUserBooks(customer.id),
              },
            ]
          : []),
      ]}
    />
  );

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <div className="page-container">
        <h2 className="title">Library customers:</h2>
        <div className="container">
          <LibEntities
            entities={customers}
            loading={loading}
            children={renderBookCard}
            sortOptions={USER_SORT_OPTIONS}
          />
        </div>

        {usersBookOpen && (
          <Modal setOpen={setUsersBookOpen}>
            <ul className="list">
              {loading ? (
                <p>Loading...</p>
              ) : (
                openUsersBooks.map((book) => (
                  <li key={book.id} className="list-item">
                    <p className="name">book: {book.name}</p>
                    <p>borrow date: {book.borrow_date}</p>
                  </li>
                ))
              )}
            </ul>
          </Modal>
        )}
      </div>

      {addBalanceOpen && (
        <ChangeBalanceModal
          addToBalance={addToBalanceModal}
          usersBalance={userToAdd.balance}
          setOpen={setAddBalanceOpen}
        />
      )}

      {deleteItselfOpen && (
        <Modal setOpen={setDeleteItselfOpen}>
          <DeleteAccountModal
            handleDelete={handleDelete}
            setDeleteItselfOpen={setDeleteItselfOpen}
            userId={Number(loggedUser())}
          />
        </Modal>
      )}
    </>
  );
}

export default Customers;
