import { useEffect, useState } from "react";
import { getAllUsers, getUserstimeoutBooks } from "../../api/api";
import Card from "../../Components/Card/Card";
import Modal from "../../Components/Modal/Modal";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersBookOpen, setUsersBookOpen] = useState(false);
  const [openUsersBooks, setOpenUsersBooks] = useState([]);

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
                    headers: "Email: " + customer.email,
                  }}
                  btnData="View Books"
                  showBtn={customer.isLate}
                  showIcon={true}
                  onClickBtn={() => viewUserBooks(customer.id)}
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
    </>
  );
}

export default Customers;
