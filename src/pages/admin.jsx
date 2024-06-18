import { Link } from "react-router-dom";
import "./admin.css";
import { LinkButton } from "../components/Buttons";

const Admin = () => {
  return (
    <div id="main__container">
      <h2 class="heading">Library Management System - Admin Page</h2>
      <div id="nav-links">
        <LinkButton href="/addbook" name="Add Book" />
        <LinkButton href="/allbooks" name="All Books" />
        <LinkButton href="/listissues" name="List Issues" />
        <LinkButton href="/updatebooks" name="Update Books" />
      </div>
    </div>
  );
};

export default Admin;
