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

  return (
    <div>
      <h2>My Picks</h2>
      {user && user.liked.length > 0 ? (
        <UserList users={user.liked} />
      ) : (
        <p>You have no liked users yet.</p>
      )}
    </div>
  );
};

export default Picks;
