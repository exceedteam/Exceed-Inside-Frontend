import React from "react";
import Modal from "react-modal";
import styles from "./Modal.module.css";

export default class ModalWindow extends React.Component {
  render() {
    const { handleVisible, isOpen, children, title } = this.props;
    return (
      <Modal
        className={styles.content}
        isOpen={isOpen}
        onRequestClose={handleVisible}
        ariaHideApp={false}
        overlayClassName={styles.overlay}
      >
        <div className={styles.header}>
          <h1>{title}</h1>
          <button onClick={handleVisible} className={styles.btn}>
            Close
          </button>
        </div>
        {children}
      </Modal>
    );
  }
}
