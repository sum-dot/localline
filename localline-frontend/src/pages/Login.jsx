import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // required so the login cookie gets stored
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      console.log("Logged in:", data);
      navigate("/"); // redirect wherever makes sense after login
    } catch (err) {
      setError("Something went wrong. Is the backend running?");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-box">
        <div className="login-header">
          <h3>Login</h3>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="input-box">
            <input
              type="text"
              className="input-field"
              placeholder="Email"
              autoComplete="off"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              autoComplete="off"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-submit">
            <button className="submit-btn" type="submit">
              Sign In
            </button>
          </div>
        </form>
        <div className="sign-up-link">
          <p>
            Don't have account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}