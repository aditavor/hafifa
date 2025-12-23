import { useEffect, useState } from "react";
import LibUsers from "../../Components/LibUsers/LibUsers";
import { getAllUsers, returnTimeoutUsers } from "../../api/api";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [timeoutCustomer, setTimeoutCustomer] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    setLoading(true);

    const { data: users } = await getAllUsers();
    setCustomers(users);

    const { data: timeoutUsers } = await returnTimeoutUsers();
    setTimeoutCustomer(timeoutUsers);

    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="page-container">
        <h2 className="title">Library customers:</h2>
        <div className="container">
          <div className="container-item">
            <LibUsers users={customers} errorMessage={"no users"}></LibUsers>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customers;
