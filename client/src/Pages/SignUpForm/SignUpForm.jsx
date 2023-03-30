import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const SignUpForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userData = {
      name: "",
      gender: "",
      age: "",
      hobbies: [],
      introduction: "",
    };

    for (const entry of formData.entries()) {
      if (entry[0] === "name") {
        userData.name = entry[1];
      }
      if (entry[0] === "gender") {
        userData.gender = entry[1];
      }
      if (entry[0] === "age") {
        userData.age = entry[1];
      }
      if (entry[0] === "hobbies") {
        userData.hobbies.push(entry[1]);
      }
      if (entry[0] === "introduction") {
        userData.introduction = entry[1];
      }
    }

    fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    .then((res) => res.json())
    .then((user) => navigate(`/${id}/questionnaire`));
  };

  useEffect(() => {
    fetchHobbies();
  }, []);

  return (
    <>
    <div>
        <h1>Welcome!</h1>
        <h3>You just joined the most prestigious dating site! We appreciate
        you being here! Let's get you started on your amorous adventures!</h3>
        <h4>Please share some information about yourself. It will help others find you!</h4>
    </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="detail-row">
            <span className="detail-label">Name: </span>
            <input className="detail-value-edit" name="name"/>
          </div>
          <div className="detail-row">
            <span className="detail-label">Gender: </span>
            <label htmlFor="male">
              Male
              <input type="radio" name="gender" value="male" id="male" />
            </label>
            <label htmlFor="female">
              Female
              <input type="radio" name="gender" value="female" id="female" />
            </label>
            <label htmlFor="nonbinary">
              Non-binary
              <input
                type="radio"
                name="gender"
                value="nonbinary"
                id="nonbinary"
              />
            </label>
          </div>
          <div className="detail-row">
            <span className="detail-label">Age: </span>
            <input type="number" className="detail-value-edit" name="age"/>
          </div>
          <div className="detail-row">
            <span className="detail-label">Hobbies: </span>
            {hobbyList && (
              <Select
                options={hobbyList}
                name="hobbies"
                placeholder="Select hobbies"
                isMulti={true}
              />
            )}
          </div>
          <div className="detail-row">
            <span className="detail-label">Introduction: </span>
            <input type="text" className="detail-value-edit" name="introduction"></input>
          </div>
          <div className="button-row">
            <button className="save-button" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
