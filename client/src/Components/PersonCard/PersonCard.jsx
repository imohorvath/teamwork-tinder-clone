import {
  AiOutlineMessage,
  AiOutlineRightCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

import "./PersonCard.css";

const PersonCard = ({ user, current, onLike, onReject, onSlide, index }) => {
  return (
    <div key={user._id} className={index === current ? "card card_active" : "card"} style={{ backgroundImage: `url(${user.image})` }}>
      <div className="card-overlay">
        <div className="card-overlay-text">
          <p className="card-overlay-text-name">{user.name} {user.age}</p>
          <p className="card-overlay-text-intro">{user.introduction}</p>
        </div>
        <div className="card-overlay-buttons">
          <AiOutlineCloseCircle className="card-overlay-button closecircle" onClick={() => onReject(user._id)}/>
          <AiOutlineRightCircle className="card-overlay-button rightcircle" onClick={onSlide}/>
          <AiOutlineCheckCircle className="card-overlay-button checkcircle" onClick={() => onLike(user._id)}/>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
