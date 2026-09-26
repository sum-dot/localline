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
  const [saveError, setSaveError] = useState("");
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (checkingAuth || !isLoggedIn) return;

    fetch("http://localhost:4000/users/me/favorites", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch(() => setFavorites([]));
  }, [checkingAuth, isLoggedIn]);

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
    setSaveError("");
    const res = await fetch("http://localhost:4000/users/me", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nameDraft, email: emailDraft }),
    });
    const updated = await res.json();

    if (!res.ok) {
      setSaveError(updated.error || "Something went wrong");
      return;
    }

    setMe(updated);
    setEditing(false);
  };

  const handleRemoveFavorite = async (busId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/users/me/favorites/${busId}`,
        { method: "POST", credentials: "include" },
      );
      if (!res.ok) return;

      // The bus is no longer favorited (this same endpoint toggles),
      // so just drop it from the locally displayed list.
      setFavorites((prev) => prev.filter((bus) => bus._id !== busId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleFavoriteClick = (bus) => {
    navigate("/", { state: { from: bus.from, to: bus.to } });
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
              {saveError && (
                <p style={{ color: "red", fontSize: "0.85rem" }}>{saveError}</p>
              )}
              <button className="btn-primary" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn-outline"
                onClick={() => {
                  setEditing(false);
                  setEmailDraft(me.email);
                  setNameDraft(me.name);
                  setSaveError("");
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

      <div className="favorites-card">
        <h2 className="favorites-title">My Favorite Buses</h2>

        {favorites.length === 0 ? (
          <p className="favorites-empty">
            No favorites yet — heart a bus on the route finder to save it here.
          </p>
        ) : (
          <ul className="favorites-list">
            {favorites.map((bus) => (
              <li key={bus._id} className="favorite-item">
                <button
                  className="favorite-item-main"
                  onClick={() => handleFavoriteClick(bus)}
                >
                  <span className="favorite-name">
                    {bus.nameLocal && bus.nameLocal.trim() !== ""
                      ? bus.nameLocal
                      : bus.name}
                  </span>
                  <span className="favorite-route">
                    {bus.from} → {bus.to}
                  </span>
                </button>
                <button
                  className="favorite-remove"
                  onClick={() => handleRemoveFavorite(bus._id)}
                  aria-label="Remove from favorites"
                  title="Remove from favorites"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default Profile;
