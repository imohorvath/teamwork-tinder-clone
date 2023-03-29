import { Link } from "react-router-dom";
import "./UserList.css";

const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <img src={user.image} alt="profile" />
        </div>
      ))}
    </div>
  );
};

export default UserList;
