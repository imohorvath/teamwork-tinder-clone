import { useEffect, useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";

import "./Header.css";

const greetings = [
  "Looking great, ",
  "Que pasa, ",
  "Ciao, ",
  "Howdy, ",
  "Peek-a-boo, ",
  "You know who this is. It's ",
  "Hola, ",
];

const randomGreet = greetings[Math.floor(Math.random() * greetings.length)];

const Header = () => {
  const { id } = useParams();

  const [currentUser, setCurrentUser] = useState("");

  const fetchUser = () => {
    fetch("/api/users")
        .then((response) => response.json())
        .then((users) => {
          setCurrentUser(users.filter((user) => user._id === id)[0]);
        });
    
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="Layout">
      <div className="header">
        <nav>
          <ul>
            <li className="header-logo">
              <img
                className="header-logo-image"
                src="./images/heartflame02.png"
                alt="Logo"
              />
            </li>
            <li className="header-title">MatchBox</li>
          </ul>
          {currentUser && (
            <ul>
              <Link to={`/${id}/profile`}>
                <li className="header-welcomemsg">
                  {currentUser.name
                    ? randomGreet + currentUser.name.split(" ")[0] + "!"
                    : randomGreet + currentUser.username + "!"}
                </li>
              </Link>
              <Link to={`/`}>
                <li className="header-logout">Logout</li>
              </Link>
            </ul>
          )}
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
