/*
  Component with which the application header is rendered
*/
import React from "react";
import styles from "./Header.module.css";
import jwtDecode from "jwt-decode";

export default class Header extends React.Component {
  // Removing a token from the local storage and switching to the login page
  logout = () => {
    this.props.handleLogin(false);
    this.props.history.push("/login");
    localStorage.removeItem("token");
  };

  // getting user id from token
  getId = () => {
    const token = localStorage.getItem("token");
    let decodedToken = jwtDecode(token);
    return decodedToken.id;
  };

  // Render of one of two kinds of header
  render() {
    const { isLogged } = this.props;
    if (isLogged) {
      return (
        <Logged
          history={this.props.history}
          logout={this.logout}
          id={this.getId()}
        />
      );
    } else {
      return (
        <NotLogged
          login={this.login}
          registration={this.registration}
          history={this.props.history}
        />
      );
    }
  }
}
// If the User logged in
const Logged = ({ logout, history, id }) => {
  return (
    <div className={styles.headerLogged}>
      <input
        type="button"
        className={styles.buttonLoggedLeft}
        onClick={() => history.push("/")}
        value="Main page"
      />
      <div className={styles.buttonLoggedRight}>
        <input type="button" className={styles.button} value="user" />
        <div className={styles.dropdownContent}>
          <div className={styles.column}>
            <input
              type="button"
              className={styles.headerButton}
              onClick={logout}
              value="Logout"
            />
            <input
              type="button"
              className={styles.headerButton}
              onClick={() => history.push(`/user/${id}`)}
              value="Profile"
            />
            <input
              type="button"
              className={styles.headerButton}
              onClick={() => history.push("/createPost")}
              value="New post"
            />
            <input
              type="button"
              className={styles.headerButton}
              onClick={() => history.push("/events")}
              value="Events"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// If the User not logged
const NotLogged = ({ history }) => {
  return (
    <div className={styles.headerNotLogged}>
      <input
        type="button"
        className={styles.buttonNotLogged}
        onClick={() => history.push("/login")}
        value="Sign in"
      />
      <input
        type="button"
        className={styles.buttonNotLogged}
        onClick={() => history.push("/registration")}
        value="Registration"
      />
    </div>
  );
};
