import { Outlet, Link } from "react-router-dom";

import "./Header.css";

const Header = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link>LOGO</Link>
        </li>
        <li>
          <Link>
            <button type="button">BRAND NAME</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Header;
