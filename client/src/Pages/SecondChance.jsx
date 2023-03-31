import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import UserList from "../Components/UserList";
import Loading from "../Components/Loading";

const SecondChance = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((user) => {
        setLoading(false);
        setUser(user)
      });
  }, [id]);

  const removeFromRejected = async (rejectedUserId) => {
    setLoading(true);
    await fetch(`/api/users/${id}/rejected/${rejectedUserId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setLoading(false);
        setUser(updatedUser)
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="list-header">
        <h2>Second Chance 🔄</h2>
        <h3>Do you want to give them another chance? Click on'Remove'!</h3>
      </div>
      {user && user.rejected.length > 0 ? (
        <UserList users={user.rejected} onRemove={removeFromRejected} />
      ) : (
        <div className="list-message">
          <p>You have no rejected users yet.</p>
        </div>
      )}
    </div>
  );
};

export default SecondChance;
