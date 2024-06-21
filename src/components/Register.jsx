import { Link } from "react-router-dom";
import "./register.css";
import { useState } from "react";

const Register = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("admin");
  const [status, setStatus] = useState("")

  const handleCreateAccount = async (e) => {
        e.preventDefault();
        // send Data to server
        const user = {
          libId: 1,
          name,
          email,
          contact,
          role
        };
        console.log(user)

        const response = await fetch("http://localhost:5101/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const res = await response.json();
        setStatus(res.status)
      };
 
 
  return (
    <div className="container">
      <form action="#" onSubmit={handleCreateAccount}>
        <h1>Register</h1>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="name"
            name="name"
            id="name"
            placeholder="Enter name here"
            onChange={e => setName(e.target.value)}
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email here"
          />
        </div>
        <div>
          <label htmlFor="contact">Contact: </label>
          <input
            type="text"
            name="contact"
            id="contact"
            onChange={e => setContact(e.target.value)}
            placeholder="Enter contact number"
          />
        </div>
        <div>
          <select name="role" id="role" onChange={e => setRole(e.target.value)}>
            <option defaultValue="role" disabled>
              Select Role
            </option>
            <option value="admin">Admin</option>
            <option value="reader">Reader</option>
          </select>
          <Link to="/login">Already have account ? Login</Link>
        </div>
        <button type="submit">Register</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Register;
