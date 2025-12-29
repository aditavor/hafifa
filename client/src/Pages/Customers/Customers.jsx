import { useEffect, useState } from "react";
import {
  getAllUsers,
  getUserstimeoutBooks,
  updateBalance,
} from "../../api/api";
import { userId } from "../../Utils/systemUtils";
import Card from "../../Components/Card/Card";
import Modal from "../../Components/Modal/Modal";
import ChangeBalanceModal from "../../Components/ChangeBalanceModal/ChangeBalanceModal";
import { useBalance } from "../../context/Balance/useBalance";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addBalanceOpen, setAddBalanceOpen] = useState(false);
  const [userToAdd, setUserToAdd] = useState({});
  const [usersBookOpen, setUsersBookOpen] = useState(false);
  const [openUsersBooks, setOpenUsersBooks] = useState([]);
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

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <div className="page-container">
        <h2 className="title">Library customers:</h2>
        <div className="container">
          <div className="container-item">
            {loading ? (
              <p>Loading...</p>
            ) : customers.length !== 0 ? (
              customers.map((customer) => (
                <Card
                  key={customer.id}
                  data={{
                    id: customer.id,
                    name: customer.username,
                    headers:
                      "Email: " +
                      customer.email +
                      " \nBalance: " +
                      customer.balance,
                  }}
                  onDelete={true}
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
              ))
            ) : (
              <p>No Users</p>
            )}
          </div>
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
    </>
  );
}

export default Customers;
