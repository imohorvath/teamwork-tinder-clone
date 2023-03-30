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

  return (
    <div>
      <h2 className="list-header">Second Chance 🔄</h2>
      {user && user.rejected.length > 0 ? (
        <UserList users={user.rejected} />
      ) : (
        <p>You have no rejected users yet.</p>
      )}
    </div>
  );
};

export default SecondChance;

