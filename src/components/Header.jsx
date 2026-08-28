// import "./Header.css";
import { Link } from "react-router";

function Header() {
    return (
        <header className="main-header">

            <div className="logo">
                🚌LocalLine
            </div>

            <div className="headercontent">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>

        </header>
    );
}

export default Header;