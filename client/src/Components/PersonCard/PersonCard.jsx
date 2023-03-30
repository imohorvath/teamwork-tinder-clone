import "./PersonCard.css";

const PersonCard = ( {person} ) => {
  console.log(person);
  return (
    <div className='card' style={{backgroundImage: `url(${person.image})`}}>
      {person.name}
    </div>
  );
};

export default PersonCard;
