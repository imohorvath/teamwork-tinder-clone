import { Outlet, Link } from "react-router-dom";

import "./Header.css";

const Header = () => (
  <>
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
        <li className="header-title">Matchbox</li>
      </ul>
    </nav>
  </div>
  <Outlet />
  </>
);

export default Header;
