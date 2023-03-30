import "./UserList.css";

const UserList = ({ users, onRemove }) => {
  return (
    <div className="userlist-container">
      {users.map((user) => (
        <div
          key={user._id}
          className="userlist-card"
          style={{ backgroundImage: `url(${user.image})` }}
        >
          <div className="card-overlay">
            <div className="card-overlay-text">
              <p className="card-overlay-text-name">
                {user.name} {user.age}
              </p>
              <p className="card-overlay-text-intro">{user.introduction}</p>
              <p className="card-overlay-text-hobbies">Hobbies: {user.hobbies.join(', ')}</p>
              <button className="remove-button" onClick={() => onRemove(user._id)}>Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
