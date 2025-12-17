import Card from "../Card/Card";

function LibUsers({ users, errorMessage }) {
  return (
    <div className="container-item">
      {users.length !== 0 ? (
        users.map((customer) => (
          <Card
            key={customer.id}
            data={{
              id: customer.id,
              name: customer.username,
              headers:
                "Email: " +
                customer.email +
                (customer.bookName ? "\n\nBook: " + customer.bookName : ""),
            }}
          />
        ))
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
}

export default LibUsers;
