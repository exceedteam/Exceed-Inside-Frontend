/*
  Used to display author information
*/
import React from "react";
import moment from "moment";
import styles from "./PostHeader.module.css"

const PostHeader = ({ avatar, name, date, onClick }) => {
  return (
    <div className={styles.postHeader}>
      <img src={avatar} alt="" onClick={onClick} className={styles.avatar}/>
      <div className={styles.info}>
        <h4 className={styles.clickable} onClick={onClick}>{name}</h4>
        {
          date && <span className={styles.date}>{moment(date).format("ddd L HH:mm")}</span>
        }
      </div>
    </div>
  );
};

export { PostHeader };
