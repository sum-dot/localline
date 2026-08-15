import "./style.css";

export default function Login() {
    return (
        <div className="login-box">
            <div className="login-header">
                <header>Login</header>
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
                <p>Don't have account? <a href="#">Sign Up</a></p>
            </div>
        </div>
    );
}
