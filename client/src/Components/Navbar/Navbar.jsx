import { Link } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-section">
        <div className="logo">Bookod</div>
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={() => localStorage.clear()}>
              LogOut
            </Link>
          </li>
        </ul>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/home">Library</Link>
        </li>
        <li>
          <Link to="/persnal">Personal</Link>
        </li>
        {localStorage.getItem("is_worker") === "true" && (
          <li>
            <Link to="/customers">Customers</Link>
          </li>
        )}
        <li>
          <Link to="/publishers">Publishers</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
