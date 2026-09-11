import "./Header.css";
import { Link } from "react-router";
import { useAuthContext } from "../context/AuthContext";

function Header() {
  const { isLoggedIn, isAdmin } = useAuthContext();

  return (
    <header className="main-header">
      <div className="logo">🚌LocalLine</div>
      <div className="headercontent">
        {isLoggedIn ? (
          <>
            {isAdmin && <Link to="/admin">Admin</Link>}
            <Link to="/profile">Profile</Link>
          </>
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
