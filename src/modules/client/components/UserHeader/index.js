var React = require("react");

const UserHeader = ({ avatar, name, date, onClick }) => {
  return (
    <div onClick={onClick}>
      <img src={avatar} alt="" />
      <div>
        <div>{name}</div>
      </div>
      <span>{date}</span>
    </div>
  );
};

export {UserHeader};
