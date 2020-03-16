import React from "react";
import {connect} from "react-redux";
import styles from "./AlertMessage.module.css";
import {ClearMessage } from "../../../redux/actions/events/update"

class AlertMessage extends React.Component {
  render() {
   if(this.props.message) return (
      <div className={styles.alert} ref={(node) => {
        this.alert = node
      }}>
        <span
          className={styles.closebtn}
          onClick={()=> {
            this.props.ClearMessage()
            // this.alert.style.display = 'none'
          }}
        >
          &times;
        </span>
        {this.props.message}
      </div>
    );
    return null
  }
}

const mapStateToProps = state => {
  return {
    message: state.events.message 
  };
};

export default connect(mapStateToProps, {ClearMessage})(AlertMessage);
