import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

function Profile() {
  const { isLoggedIn, checkingAuth, logout } = useAuthContext();
  const [me, setMe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (checkingAuth) return; // still confirming session, wait
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:4000/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then(setMe)
      .catch(() => navigate("/login"));
  }, [checkingAuth, isLoggedIn, navigate]);

  const handleLogout = async () => {
    await logout(); // context's logout already navigates to "/"
  };

  if (checkingAuth || !me)
    return <div className="profile-page">Loading...</div>;

  return (
    <div className="profile-page">
      <h1 style={{ color: "#059033" }}>Profile</h1>
      <div className="profile-card">
        <h2 style={{ color: "black", fontWeight: "bold" }}>{me.name}</h2>
        <div className="profile-details">
          <span className="label">Email : </span>
          <input type="text" value={me.email} readOnly />
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
export default Profile;
