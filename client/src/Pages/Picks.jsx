import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import UserList from "../Components/UserList";
import Loading from "../Components/Loading";

const Picks = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((user) => {
        setLoading(false);
        setUser(user);
      });
  }, [id]);

  const removeFromLiked = async (likedUserId) => {
    setLoading(true);
    await fetch(`/api/users/${id}/liked/${likedUserId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setLoading(false);
        setUser(updatedUser);
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="list-header">
        <h2>My Picks 📌</h2>
        <h3>Not hot enough? Click on 'Remove'!</h3>
      </div>
      {user && user.liked.length > 0 ? (
        <UserList users={user.liked} onRemove={removeFromLiked} />
      ) : (
        <div className="list-message">
          <p>You have no liked users yet.</p>
        </div>
      )}
    </div>
  );
};

export default Picks;
