import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Matchbox from "../../Components/Matchbox";

const MatchboxPage = () => {
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
      {otherUsers && <Matchbox otherUsers={otherUsers} currentUser={currentUser}/>}
    </>
  );
};

export default MatchboxPage;
