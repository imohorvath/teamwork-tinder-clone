import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, []);

  // useEffect(() => {
  //   fetch(`https://api.pexels.com/v1/search/?page=3&per_page=80&query=male&size=medium`, {
  //     headers: {
  //       Authorization:
  //         "563492ad6f917000010000016100bc354d8a41ee9d24ded961660c34",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  return (
    <>
    <div className="profile-container">
      <h2>Hello {user.name}</h2>
      <img src={user.image} alt="profile" />
      </div>
    </>
  );
};

export default Profile;
