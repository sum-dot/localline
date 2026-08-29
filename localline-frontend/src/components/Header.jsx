import "./Header.css";
import { Link } from "react-router";
import { useAuthContext } from "../context/AuthContext";

function Header() {
    const { isLoggedIn } = useAuthContext();

    return (
        <header className="main-header">
            <div className="logo">🚌LocalLine</div>
            <div className="headercontent">
                {isLoggedIn ? (
                    <Link to="/profile">Profile</Link>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;