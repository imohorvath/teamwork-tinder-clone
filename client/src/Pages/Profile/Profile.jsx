import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Profile.css";
import ProfileDetails from "../../Components/ProfileDetails";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const updateUser = (updatedUser) => {
    fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((user) => setUser(user));
  };

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, [id]);

  return (
    <>
      {user && (
        <div className="profile-container">
          <h2>Hello {user.name.split(" ")[0]}!</h2>
          <div className="profile-pic">
            <img src={user.image} alt="profile" />
          </div>
          <div className="profile-menu">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="profile-button button-personal-details"
            >
              {showDetails ? "Hide my personal info" : "Show my personal info"}
            </button>
            {showDetails && <ProfileDetails user={user} updateUser={updateUser}/>}
            <Link>
              <button className="profile-button button-matches">
                My matches 🔥
              </button>
            </Link>
            <Link>
              <button className="profile-button button-favourites">
                My picks 📌
              </button>
            </Link>
            <Link>
              <button className="profile-button button-second-chance">
                Second chance 🔄
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
