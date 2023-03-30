import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import UserList from "../Components/UserList";

const Picks = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, [id]);

  const removeFromLiked = async (likedUserId) => {
    await fetch(`/api/users/${id}/liked/${likedUserId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((updatedUser) => setUser(updatedUser))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="list-header">
        <h2>My Picks 📌</h2>
        <h4>Changed your mind? Click 'Remove'!</h4>
      </div>
      {user && user.liked.length > 0 ? (
        <UserList users={user.liked} onRemove={removeFromLiked} />
      ) : (
        <p>You have no liked users yet.</p>
      )}
    </div>
  );
};

export default Picks;
