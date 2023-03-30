import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Matchbox from "../../Components/Matchbox";
import Loading from "../../Components/Loading";

const MatchboxPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [otherUsers, setOtherUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  // console.log(currentUser);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((users) => {
        const currentUser = users.filter((user) => user._id === id)[0];
        setCurrentUser(currentUser);
        // console.log(users)
        setOtherUsers(
          users.filter(
            (user) =>
              user._id !== id && currentUser.gender !== user.gender &&
              !currentUser.liked.includes(user._id) &&
              !currentUser.rejected.includes(user._id)
          )
        );
        // console.log(otherUsers)
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {otherUsers && (
        <Matchbox otherUsers={otherUsers} currentUser={currentUser} />
      )}
    </>
  );
};

export default MatchboxPage;
