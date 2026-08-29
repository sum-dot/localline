import { useState } from "react";
import "./style.css";
import { Link } from "react-router";
import { useAuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || "Something went wrong. Is the backend running?");
    }
  };

  return (
    <div className="login-page-wrapper">
      <Link to="/" className="backbtn">
        ←
      </Link>
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
            Don't have account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}