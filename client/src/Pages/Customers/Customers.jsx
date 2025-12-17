import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Collapse from "../../Components/Collaspe/Collapse";
import LibUsers from "../../Components/LibUsers/LibUsers";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [timeoutCustomer, setTimeoutCustomer] = useState([]);

  const fetchCustomers = async () => {
    let res = await fetch("http://localhost:3000/users");
    let data = await res.json();
    setCustomers(data);

    res = await fetch("http://localhost:3000/users/returnTimeout");
    data = await res.json();
    setTimeoutCustomer(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <Navbar />
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
