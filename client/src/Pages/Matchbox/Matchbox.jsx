import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PersonCard from "../../Components/PersonCard";

import "./Matchbox.css";

const Matchbox = () => {
  const { id } = useParams();

  const [otherUsers, setOtherUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((users) => {
        setOtherUsers(users.filter((user) => user._id !== id));
        setCurrentUser(users.filter((user) => user._id === id)[0]);
      });
  }, [id]);

  return (
    <>
      {currentUser && (
        <div className="card-container">
          {/* {otherUsers.map((person) => (
        <PersonCard person={person} />
      ))} */}
          <PersonCard person={currentUser} />
        </div>
      )}
    </>
  );
};

export default Matchbox;
