import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PersonCard from "../../Components/PersonCard";

import "./Matchbox.css";

const Matchbox = () => {
  const { id } = useParams();

  const [otherUsers, setOtherUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((users) => {
        setOtherUsers(users.filter((user) => user._id !== id));
        setCurrentUser(users.filter((user) => user._id === id)[0]);
      });
  }, [id]);

  const handleLike = () => {};

  const handleReject = () => {};

  const handleSlideRight = () => {
    setCurrent(current === otherUsers.length - 1 ? 0 : current + 1)
  };

  return (
    <>
      {otherUsers && (
        <div className="card-container">
          {otherUsers.map((user, index) => (
            <PersonCard person={user} index={index} current={current} onLike={handleLike} onReject={handleReject} onSlide={handleSlideRight} />
          ))}
        </div>
      )}
    </>
  );
};

export default Matchbox;
