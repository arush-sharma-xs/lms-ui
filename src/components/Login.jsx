import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { FromLoginButton } from "./Buttons";

const Login = () => {
  const [email, setEmail] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    let emailRegex = /^[a-zA-Z][a-zA-Z0-9.]+@[a-zA-Z]+[.](com|in|edu)/;

    if (!emailRegex.test(email)) {
      error.textContent = "Enter valid Email Id";
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
      localStorage.setItem("currentUser", JSON.stringify(result));

      if (result.userType == "admin") {
        window.location.href = "/admin"
      } else {
        window.location.href = "/reader"
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
        <FromLoginButton />
      </form>
      <p id="error"></p>
    </div>
  );
};

export default Login;
