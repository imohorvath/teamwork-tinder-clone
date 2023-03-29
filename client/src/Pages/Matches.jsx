import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import UserList from "../Components/UserList";

const Matches = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, [id]);

  return (
    <div>
      <h2>My Matches 🔥</h2>
      {matches.length > 0 ? (
        <UserList users={matches} />
      ) : (
        <p>You have no matches yet.</p>
      )}
    </div>
  );
};

export default Matches;
