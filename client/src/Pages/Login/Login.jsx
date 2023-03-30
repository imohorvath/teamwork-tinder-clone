import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const fetchUserbyUserName = (name) => {
  return fetch(`/api/users?username=${name}`).then((res) => res.json());
};

const fetchRandomImage = () => {
  return fetch(
    `https://api.pexels.com/v1/search?per_page=80&query=person&size=medium`,
    {
      headers: {
        Authorization:
          "563492ad6f917000010000016100bc354d8a41ee9d24ded961660c34",
      },
    }
  ).then((res) => res.json());
};

const createRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const Login = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showMessageInvalid, setshowMessageInvalid] = useState(false);
  const [showMessageExisting, setShowMessageExisting] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [signupName, setSignupName] = useState("");

  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setshowMessageInvalid(false);

    const response = await fetchUserbyUserName(loginName);

    if (response.length > 0) {
      const person = response[0];
      if (person.liked.length === 0) {
        navigate(`/${person._id}/questionnaire`);
      } else {
        navigate(`/${person._id}/profile`);
      }
    } else {
      setshowMessageInvalid(true);
    }
    setLoginName("");
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    setShowMessageExisting(false);

    const response = await fetchUserbyUserName(signupName);

    if (response.length === 0) {
      const images = await fetchRandomImage();
      const imageUrl =
        images.photos[createRandomNumber(0, images.photos.length)].src.portrait;
      createNewUser(signupName, imageUrl);
    } else {
      setShowMessageExisting(true);
    }
    setSignupName("");
  };

  const createNewUser = async (username, image) => {
    const body = { username, image };

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((newuser) => navigate(`/${newuser._id}/first-steps`));
  };

  return (
    <>
      <div className="login-container">
        <h2 onClick={() => setShowLogin(!showLogin)}>LOGIN</h2>
        {showLogin && (
          <form onSubmit={handleSubmitLogin}>
            <input
              type="text"
              id="username"
              name="username"
              pattern="[a-z]{2,10}\d{3}"
              placeholder="Please type here your username..."
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
            />
            {(showMessageInvalid && showLogin) && (
              <>
                <p className="login-container-message-optional">Invalid username</p>
                <p className="login-container-message-optional">Please try again or sign-up</p>
              </>
            )}
            <button type="submit">Log me in</button>
          </form>
        )}
        <h2 onClick={() => setShowSignup(!showSignup)}>SIGNUP</h2>
        {showSignup && (
          <form onSubmit={handleSubmitSignup}>
            <input
              type="text"
              id="username"
              name="username"
              pattern="[a-z]{2,10}\d{3}"
              placeholder="Please choose a username eg. anita366..."
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />
            {(showMessageExisting && showSignup) && (
              <p className="login-container-message-optional">This username is already in use, please try another</p>
            )}
            <p className="login-container-message-mandantory">Username should consist of 2-10 letters and 3 digits</p>
            <button type="submit">Sign me up</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Login;
