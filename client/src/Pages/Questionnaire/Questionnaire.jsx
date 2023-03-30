import "./Questionnaire.css";
import React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";

import "./Questionnaire.css";
import Matchbox from "../../Components/Matchbox";

const Questionnaire = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [otherUsers, setOtherUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [hobbies, setHobbies] = useState();
  const [formVisibility, setFormVisibility] = useState(true);

  const fetchUsers = () => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((users) => {
        setOtherUsers(users.filter((user) => user._id !== id));
        setCurrentUser(users.filter((user) => user._id === id)[0]);
      });
  };

  const fetchHobbies = () => {
    fetch("/api/hobbies/")
      .then((response) => response.json())
      .then((hobbies) => {
        let list = [];
        for (const hobby of hobbies) {
          list.push({ value: `${hobby}`, label: `${hobby}` });
        }
        setHobbies(list);
      });
  };

  const filterByForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let filterTags = { gender: [], age: "", hobbies: [] };

    for (const entry of formData.entries()) {
      if (entry[0] === "gender") {
        filterTags.gender.push(entry[1]);
      }
      if (entry[0] === "age") {
        filterTags.age = entry[1];
      }
      if (entry[0] === "hobbies") {
        filterTags.hobbies.push(entry[1]);
      }
    }

    let filteredUsers = [...otherUsers]
      .filter((user) => {
        if (filterTags.gender.length === 1) {
          return (
            user.gender === filterTags.gender[0] || user.gender === "nonbinary"
          );
        } else {
          return user;
        }
      })
      .filter((user) => {
        if (filterTags.age === "younger") {
          return user.age < currentUser.age - 3;
        } else if (filterTags.age === "sameage") {
          return (
            currentUser.age - 4 < user.age && user.age < currentUser.age + 4
          );
        } else if (filterTags.age === "older") {
          return user.age - currentUser.age > 3;
        } else {
          return user;
        }
      })
      .filter((user) => {
        return user.hobbies.some((hobby) => filterTags.hobbies.includes(hobby));
      });

    setOtherUsers(filteredUsers);
    setFormVisibility(false);
  };

  useEffect(() => {
    fetchUsers();
    fetchHobbies();
  }, [id]);

  return (
    <>
      <div className="greeting">
        <h1>Amazing!</h1>
        <h3>
          With your profile all set up, other people can now find you based on a
          little questionnaire like this one.
        </h3>
        <h4>Fill it out and start mingling!</h4>
      </div>
      {formVisibility ? (
        <div className="ProfileDetails">
          <form onSubmit={filterByForm}>
            <div className="detail-row">
              <span className="detail-label">Who are you looking for?</span>
              <div>
                <label className="gap" htmlFor="male">
                  Male
                  <input type="checkbox" name="gender" value="male" id="male" />
                </label>
                <label className="gap" htmlFor="female">
                  Female
                  <input
                    type="checkbox"
                    name="gender"
                    value="female"
                    id="female"
                  />
                </label>
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-label">
                What age range are you looking for?
              </span>
              <div>
                <label className="gap" htmlFor="younger">
                  Younger
                  <input type="radio" name="age" value="younger" id="younger" />
                </label>
                <label className="gap" htmlFor="sameage">
                  Same age
                  <input type="radio" name="age" value="sameage" id="sameage" />
                </label>
                <label className="gap" htmlFor="older">
                  Older
                  <input type="radio" name="age" value="older" id="older" />
                </label>
                <label className="gap" htmlFor="either">
                  Either
                  <input type="radio" name="age" value="either" id="either" />
                </label>
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-label">
                What interests would you like your partner to have?
              </span>
              {hobbies && (
                <Select
                  options={hobbies}
                  name="hobbies"
                  placeholder="Select hobbies"
                  isMulti={true}
                />
              )}
            </div>
            <div className="button-row">
              <button type="Submit">Search</button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div>
            <h4>
              Here are some people we think you'd enjoy getting to know based on
              your answers:
            </h4>
          </div>
          {otherUsers && (
            <Matchbox otherUsers={otherUsers} currentUser={currentUser} />
          )}
          <div>
            <button onClick={() => navigate(`/${id}/profile`)}>
              My profile
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Questionnaire;
