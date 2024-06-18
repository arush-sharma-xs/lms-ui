import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import useLogged from "../hooks/useLogged";

const Navbar = () => {
  const logged = useLogged();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <header id="header">
      <div>
        <Link to="/admin" style={{ display: "flex", alignItems: "center" }}>
          <img src={Logo} />
          <span>Library Management System</span>
        </Link>
      </div>
      {!logged && (
        <ul id="navigations">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      )}

      {logged && (
        <ul id="navigations">
          <li>
            <Link to="/addbook">Add Books</Link>
          </li>
          <li>
            <Link to="/allbooks">All Books</Link>
          </li>
          <li>
            <Link to="/updatebooks">Update Books</Link>
          </li>
          <li>
            <Link to="/listissues">List Issues</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
