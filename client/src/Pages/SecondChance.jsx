import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import UserList from "../Components/UserList";

const SecondChance = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, [id]);

  const removeFromRejected = async (rejectedUserId) => {
    await fetch(`/api/users/${id}/rejected/${rejectedUserId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((updatedUser) => setUser(updatedUser))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="list-header">
        <h2>Second Chance 🔄</h2>
        <h4>Do you want to give them another chance? Click 'Remove'!</h4>
      </div>
      {user && user.rejected.length > 0 ? (
        <UserList users={user.rejected} onRemove={removeFromRejected} />
      ) : (
        <p>You have no rejected users yet.</p>
      )}
    </div>
  );
};

export default SecondChance;
