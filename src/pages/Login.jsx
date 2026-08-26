
import "./style.css";
import { Link } from "react-router";

export default function Login() {
    return (
        <div className="login-page-wrapper">
              <div className="login-box">
           <div className="login-header">
                <h3>Login</h3>
            </div>
            <div className="input-box">
                <input type="text" className="input-field" placeholder="Email" autoComplete="off" required />
            </div>
            <div className="input-box">
                <input type="password" className="input-field" placeholder="Password" autoComplete="off" required />
            </div>
            <div className="input-submit">
                <button className="submit-btn" type="submit">Sign In</button>
            </div>
            <div className="sign-up-link">
                    <p>Don't have account? <Link to="/register">Sign Up</Link></p>
            </div>
            </div>
        </div>
    );
}
