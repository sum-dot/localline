import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

function Profile() {
  const { isLoggedIn, checkingAuth, logout } = useAuthContext();
  const [me, setMe] = useState(null);
  const [editing, setEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [emailDraft, setEmailDraft] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (checkingAuth) return;
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:4000/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setMe(data);
        setEmailDraft(data.email);
        setNameDraft(data.name);
      })
      .catch(() => navigate("/login"));
  }, [checkingAuth, isLoggedIn, navigate]);

  const handleLogout = async () => {
    await logout();
  };

  const handleSave = async () => {
    const res = await fetch("http://localhost:4000/users/me", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nameDraft, email: emailDraft }),
    });
    const updated = await res.json();
    setMe(updated);
    setEditing(false);
  };

  if (checkingAuth || !me)
    return <div className="profile-page">Loading...</div>;

  return (
    <div className="profile-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← 
      </button>
      <h1 className="profile-title">Profile</h1>
      <div className="profile-card">
        <div className="profile-details">
          <span className="label">Username</span>
          <input
            type="text"
            value={editing ? nameDraft : me.name}
            readOnly={!editing}
            onChange={(e) => setNameDraft(e.target.value)}
          />
        </div>
        <div className="profile-details">
          <span className="label">Email</span>
          <input
            type="text"
            value={editing ? emailDraft : me.email}
            readOnly={!editing}
            onChange={(e) => setEmailDraft(e.target.value)}
          />
        </div>
        <div className="profile-actions">
          {editing ? (
            <>
              <button className="btn-primary" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn-outline"
                onClick={() => {
                  setEditing(false);
                  setEmailDraft(me.email);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="btn-outline" onClick={() => setEditing(true)}>
                Edit
              </button>
              <button className="btn-primary" onClick={handleLogout}>
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Profile;
