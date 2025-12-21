import { Link } from "react-router-dom";
import "./Navbar.scss";
import { isWorker } from "../../Utils/systemUtils";

function Navbar() {
  const links = [
    { id: 0, link: "/", name: "Home" },
    { id: 1, link: "/library", name: "Library" },
    { id: 2, link: "/personal", name: "Personal" },
    ...(isWorker() ? [{ id: 3, link: "/customers", name: "Customers" }] : []),
    { id: 4, link: "/publishers", name: "Publishers" },
  ];

  return (
    <nav className="navbar">
      <div className="logo-section">
        <div className="logo">Bookod</div>
        <ul className="nav-links">
          <li>
            <Link to="/login" onClick={() => localStorage.clear()}>
              LogOut
            </Link>
          </li>
        </ul>
      </div>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.id}>
            <Link to={link.link}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
