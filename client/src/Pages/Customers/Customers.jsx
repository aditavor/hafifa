import { useEffect, useState } from "react";
import Collapse from "../../Components/Collaspe/Collapse";
import LibUsers from "../../Components/LibUsers/LibUsers";
import { getAllUsers, returnTimeoutUsers } from "../../api/api";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [timeoutCustomer, setTimeoutCustomer] = useState([]);

  const fetchCustomers = async () => {
    const { data: users } = await getAllUsers();
    setCustomers(users);

    const { data: timeoutUsers } = await returnTimeoutUsers();
    setTimeoutCustomer(timeoutUsers);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <div className="page-container">
        <div className="container">
          <Collapse title="Customers">
            <LibUsers users={customers} errorMessage={"no users"}></LibUsers>
          </Collapse>
        </div>

        <div className="container">
          <Collapse title="Customers in late">
            <LibUsers
              users={timeoutCustomer}
              errorMessage={"no users in late"}
            ></LibUsers>
          </Collapse>
        </div>
      </div>
    </>
  );
}

export default Customers;
