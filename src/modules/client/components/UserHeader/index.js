import React from "react";
import moment from "moment";

const UserHeader = ({ avatar, name, date, onClick }) => {
  return (
    <div >
      <img src={avatar} alt="" onClick={onClick}/>
      <div>
        <div onClick={onClick}>{name}</div>
      </div>
      {date && <span>{moment(date).format("ddd L HH:mm")}</span>}
    </div>
  );
};

export {UserHeader};
