import "./ProfileDetails.css";
import React, { useState, useEffect } from "react";

const ProfileDetails = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [age, setAge] = useState(user.age);
  const [hobbies, setHobbies] = useState(user.hobbies.join(", "));
  const [introduction, setIntroduction] = useState(user.introduction);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      age,
      hobbies: hobbies.split(", "),
      introduction,
    };
    //TODO here will come the updateUser(updatedUser);
    setEditMode(false);
  };

  const handleCancel = () => {
    setAge(user.age);
    setHobbies(user.hobbies.join(", "));
    setIntroduction(user.introduction);
    setEditMode(false);
  };

  return (
    <div className="ProfileDetails">
      <div className="details-container">
        <div className="detail-row">
          <span className="detail-label">Username: </span>
          <span className="detail-value">{user.username}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Name: </span>
          <span className="detail-value">{user.name}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Gender: </span>
          <span className="detail-value">{user.gender}</span>
        </div>
        {editMode ? (
          <>
            <div className="detail-row">
              <span className="detail-label">Age: </span>
              <input
                type="number"
                className="detail-value-edit"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="detail-row">
              <span className="detail-label">Hobbies: </span>
              <select
                multiple
                className="detail-value-edit"
                value={hobbies.split(", ")}
              >
                <option value="Reading">Reading</option>
                <option value="Writing">Writing</option>
                <option value="Drawing">Drawing</option>
              </select>
            </div>
            <div className="detail-row">
              <span className="detail-label">Introduction: </span>
              <input
                type="text"
                className="detail-value-edit"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
              ></input>
            </div>
            <div className="detail-row">
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="detail-row">
              <span className="detail-label">Age: </span>
              <span className="detail-value">{user.age}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Hobbies: </span>
              <span className="detail-value">{user.hobbies.join(", ")}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Introduction: </span>
              <span className="detail-value">{user.introduction}</span>
            </div>
            <button className="edit-button" onClick={() => setEditMode(true)}>
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
