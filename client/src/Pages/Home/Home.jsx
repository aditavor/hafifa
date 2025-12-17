import Navbar from "../../Components/Navbar/Navbar";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2 className="title">Welcome to the library</h2>
        <button className="to-library" onClick={() => navigate("/library")}>
          View library's books
        </button>
      </div>
    </>
  );
}

export default Home;
