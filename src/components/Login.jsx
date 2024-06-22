import { useState } from "react";
import "./styles/login.css";
import { FromLoginButton } from "./Buttons";
import ErrorAlert from "./ErrorAlert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    let emailRegex = /^[a-zA-Z][a-zA-Z0-9.]+@[a-zA-Z]+[.](com|in|edu)/;

    if (!emailRegex.test(email)) {
      setError("Enter valid Email Id");
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
        window.location.href = "/admin";
      } else {
        window.location.href = "/reader";
      }
    } else {
      setError(result.error);
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

      {error && <ErrorAlert value={error} />}
    </div>
  );
};

export default Login;
