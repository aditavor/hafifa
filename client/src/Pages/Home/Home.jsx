import AddBook from "../../Components/AddBook/AddBook";
import Navbar from "../../Components/Navbar/Navbar";
import LibBooks from "../../Components/LibBooks/LibBooks";
import "./Home.scss";

function Home() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        {localStorage.getItem("is_worker") === "true" && <AddBook />}
        <LibBooks />
      </div>
    </>
  );
}

export default Home;
