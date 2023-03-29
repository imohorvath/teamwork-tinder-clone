import "./ProfileDetails.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";

const ProfileDetails = ({ user, updateUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [age, setAge] = useState(user.age);
  const [hobbies, setHobbies] = useState(user.hobbies.map(hobby => ({ value: hobby, label: hobby })));
  const [introduction, setIntroduction] = useState(user.introduction);
  const [hobbyList, setHobbyList] = useState([]);

  const fetchHobbies = () => {
    fetch("/api/hobbies/")
      .then((response) => response.json())
      .then((hobbies) => {
        let list = [];
        for (const hobby of hobbies) {
          list.push({ value: `${hobby}`, label: `${hobby}` });
        }
        setHobbyList(list);
      });
  };

  useEffect(() => {
    fetchHobbies();
  }, []);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      age,
      hobbies: hobbies.split(", "),
      introduction,
    };
    console.log(updatedUser)
    updateUser(updatedUser);
    setEditMode(false);
  };

  const handleCancel = () => {
    setAge(user.age);
    setHobbies(user.hobbies.join(", "));
    setIntroduction(user.introduction);
    setEditMode(false);
  };

  useEffect(() => {
    console.log(hobbies);
  }, [hobbies]);

  const handleHobbiesChange = (selected) => {
    const selectedHobbies = selected.map(option => option.value);
    setHobbies(selectedHobbies.join(", "));
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
              {hobbies && (
                <Select
                  options={hobbyList}
                  name="hobbies"
                  placeholder="Select hobbies"
                  isMulti={true}
                  value={hobbies}
                  onChange={(e) => handleHobbiesChange(e)}
                />
              )}
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
