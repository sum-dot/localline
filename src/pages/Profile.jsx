import './Profile.css';

function Profile() {
    return (
      <div className="profile-page">
        <h1 style={{ color: "#059033" }}>Profile</h1>
        <div className="profile-card">
          <h2 style={{ color: "black", fontWeight: "bold" }}>Jesmine Nahar</h2>
          <div className="profile-details">
            <span className="label">Email : </span>
            <input type="text" placeholder="jesmine.nahar@example.com" readOnly />
          </div>
          <div className="profile-details">
            <span className="label">Location : </span>
            <input type="text" placeholder="Dhaka, Bangladesh" readOnly />
            {/*<span className="value">Dhaka, Bangladesh</span>*/}
          </div>
        </div>
      </div>
    );
}

export default Profile;