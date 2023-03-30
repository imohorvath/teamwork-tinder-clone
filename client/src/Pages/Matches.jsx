import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import UserList from "../Components/UserList";

const Matches = () => {
  const { id } = useParams();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(`/api/users/${id}/matches`)
      .then((res) => res.json())
      .then((matches) => setMatches(matches));
  }, [id]);

  return (
    <div>
      <h2 className="list-header">My Matches 🔥</h2>
      {matches.length > 0 ? (
        <UserList users={matches} />
      ) : (
        <p>You have no matches yet.</p>
      )}
    </div>
  );
};

export default Matches;
