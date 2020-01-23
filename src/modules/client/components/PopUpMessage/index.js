import React from "react";
import Modal from "react-modal";
import styles from "./PopUpMessage.module.css";

export default class PopUpMessage extends React.Component {
  render() {
    const { display, isOpen, textMessage } = this.props;
    return (
      <Modal
        className={styles.message}
        isOpen={isOpen}
        onRequestClose={display}
        ariaHideApp={false}
      >
        <label>{textMessage}</label>
        <button onClick={display} className={styles.button}>
          Close
        </button>
      </Modal>
    );
  }
}
