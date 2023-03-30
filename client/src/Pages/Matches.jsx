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
      <div className="list-header">
        <h2>My Matches 🔥</h2>
        <h4>Find your perfect flame and see who's burning for you too!</h4>
      </div>
      {matches.length > 0 ? (
        <UserList users={matches} />
      ) : (
        <p>You have no matches yet.</p>
      )}
    </div>
  );
};

export default Matches;
