import "./styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import useLogged from "../hooks/useLogged";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const logged = useLogged();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const ref = useRef();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const animateHeader = () => {
    // ref.current.style.transform = "";
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    }

    animateHeader();
  }, [setUser]);

  if (!logged) {
    return (
      <header ref={ref}>
        <div>
          <div>
            <Link to="/admin" style={{ display: "flex", alignItems: "center" }}>
              <img src={Logo} />
              <span>Bookverse</span>
            </Link>
          </div>

          <ul id="navigations">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <div>
          <div>
            <Link to="/admin" style={{ display: "flex", alignItems: "center" }}>
              <img src={Logo} />
              <span>Bookverse</span>
            </Link>
          </div>

          {user?.userType === "admin" ? (
            <ul id="navigations">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/admin">Dashboard</Link>
              </li>
              <li>
                <Link to="/addbook">Add Books</Link>
              </li>
              <li>
                <Link to="/allbooks">All Books</Link>
              </li>

              <li>
                <Link to="/listissues">List Issues</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          ) : (
            <ul
              id="navigations"
              style={{
                display: "Flex",
                alignItems: "center",
              }}
            >
              <li>
                <h5>{user?.email}</h5>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/reader">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          )}
        </div>
      </header>
    );
  }
};

export default Navbar;
