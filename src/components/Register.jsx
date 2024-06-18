import { Link } from "react-router-dom";
import "./register.css";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <form action="#" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="name"
            name="name"
            id="name"
            placeholder="Enter name here"
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email here"
          />
        </div>
        <div>
          <label htmlFor="contact">Contact: </label>
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="Enter contact number"
          />
        </div>
        <div>
          <select name="role" id="role">
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
    </div>
  );
};

export default Register;
