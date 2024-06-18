import { Link } from "react-router-dom";
import "./admin.css";

const Admin = () => {
  return (
    <div id="main__container">
      <h2 class="heading">Library Management System - Admin Page</h2>
      <div id="nav-links">
        <Link to="/addbook">Add Book</Link>
        <Link to="/allbooks">Book List</Link>
        <Link to="/listissues">List Issues</Link>
      </div>
    </div>
  );
};

export default Admin;
