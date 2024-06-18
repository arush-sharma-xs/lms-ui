import "./navbar.css";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useState } from "react";

const Navbar = () => {
  const [logged, setLogged] = useState(true);

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
            <Link to="/addbook">Add Book</Link>
          </li>
          <li>
            <Link to="/allbooks">Book List</Link>
          </li>
          <li>
            <Link to="/listissues">List Issues</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
