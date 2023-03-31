import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import UserList from "../Components/UserList";
import Loading from "../Components/Loading";

const Matches = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch(`/api/users/${id}/matches`)
      .then((res) => res.json())
      .then((matches) => {
        setLoading(false);
        setMatches(matches);
      });
  }, [id]);

  const handleMessageClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="list-header">
        <h2>My Matches 🔥</h2>
        <h3>Find your perfect flame and see who's burning for you too!</h3>
      </div>
      {matches.length > 0 ? (
        <UserList
          users={matches}
          isMatched={true}
          onMessageClick={handleMessageClick}
        />
      ) : (
        <div className="list-message">
          <p>You have no matches yet. :(</p>
          <p>Come back later.</p>
        </div>
      )}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h4>Want to turn up the heat with your matches? </h4>
            <h4> Upgrade to premium for fiery messaging!</h4>
            <button className="popup-close" onClick={handlePopupClose}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matches;
