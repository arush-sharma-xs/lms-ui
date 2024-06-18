import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    let emailRegex = /^[a-zA-Z][a-zA-Z0-9.]+@[a-zA-Z]+[.](com|in|edu)/;

    if (!emailRegex.test(email)) {
      error.textContent = "enter valid Email Id";
      return;
    }

    const res = await fetch("http://localhost:5101/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ libId: 1, email: email.trim() }),
    });

    const result = await res.json();

    if (res.status === 200) {
      const user = result.userData;

      console.log(user);

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: parseInt(user.ID),
          libId: 1,
          email: user.email,
        })
      );

      if (user.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/reader");
      }
    } else {
      document.getElementById("error").textContent = result.error;
    }
  };

  return (
    <div className="container">
      <form action="#" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email here"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p id="error"></p>
    </div>
  );
};

export default Login;
