import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PersonCard from "../PersonCard";

import "./Matchbox.css";

const Matchbox = ( { otherUsers, currentUser } ) => {
  const { id } = useParams();

  const [current, setCurrent] = useState(0);
  const [users, setUsers] = useState(otherUsers);

  const handleLike = (likedUserId) => {
    const body = {_id: likedUserId}
    fetch(`/api/users/${id}/liked`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json());

    setUsers(users => users.filter(user => user._id !==likedUserId));
    handleSlideRight();
  };

  const handleReject = (rejectedUserId) => {
    const body = {_id: rejectedUserId}
    fetch(`/api/users/${id}/liked`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json());

    setUsers(users => users.filter(user => user._id !==rejectedUserId));
    handleSlideRight();
  };

  const handleSlideRight = () => {
    setCurrent(current === otherUsers.length - 1 ? 0 : current + 1)
  };

  return (
    <>
      {otherUsers && (
        <div className="card-container">
          {otherUsers.map((user, index) => (
            <PersonCard key={user._id} user={user} index={index} current={current} onLike={handleLike} onReject={handleReject} onSlide={handleSlideRight} />
          ))}
        </div>
      )}
    </>
  );
};

export default Matchbox;
