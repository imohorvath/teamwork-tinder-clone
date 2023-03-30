import "./ProfileDetails.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";

const ProfileDetails = ({ user, updateUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [hobbies, setHobbies] = useState(user.hobbies.map(hobby => ({ value: hobby, label: hobby })));
  const [introduction, setIntroduction] = useState(user.introduction);
  const [hobbyList, setHobbyList] = useState([]);
  const [image, setImage] = useState(user.image);

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
    const updatedHobbies = hobbies.map(hobby => hobby.value).join(', ')
    const updatedUser = {
      ...user,
      name,
      age,
      hobbies: updatedHobbies,
      introduction,
      image,
    };
    updateUser(updatedUser);
    setEditMode(false);
  };

  const handleCancel = () => {
    setAge(user.age);
    setIntroduction(user.introduction);
    setEditMode(false);
  };

  const handleHobbiesChange = (selected) => {
    const selectedHobbies = selected.map(option => ({ value: option.value, label: option.label }));
    setHobbies(selectedHobbies);
  };

  return (
    <div className="ProfileDetails">
      <div className="details-container">
        <div className="detail-row">
          <span className="detail-label">Username: </span>
          <span className="detail-value">{user.username}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Gender: </span>
          <span className="detail-value">{user.gender}</span>
        </div>
        {editMode ? (
          <>
        <div className="detail-row">
          <span className="detail-label">Profile Picture: </span>
          <input
            type="text"
            className="detail-value-edit"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
            <div className="detail-row">
            <span className="detail-label">Name: </span>
              <input
                type="text"
                className="detail-value-edit"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              {(
                <Select
                  options={hobbyList}
                  name="hobbies"
                  placeholder="Select hobbies"
                  isMulti={true}
                  defaultValue={hobbies}
                  value={selectedOptions}
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
            <div className="button-row">
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
              <span className="detail-label">Name: </span>
              <span className="detail-value">{user.name}</span>
            </div>
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
            <div className="button-row">
            <button className="edit-button" onClick={() => setEditMode(true)}>
              Edit
            </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
