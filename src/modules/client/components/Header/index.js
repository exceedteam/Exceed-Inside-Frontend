/*
  Component with which the application header is rendered
*/
import React from "react";
import styles from "./Header.module.css";
import jwtDecode from "jwt-decode";
import { connect } from "react-redux";
import { clearUserProfile } from "../../../redux/actions/users/edit";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySubMenu: false
    };
  }

  handleSubMenu = flag => {
    this.setState({
      displaySubMenu: !this.state.displaySubMenu
    });
  };

  // Removing a token from the local storage and switching to the login page
  logout = () => {
    this.props.clearUserProfile();
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
          displaySubMenu={this.state.displaySubMenu}
          handleSubMenu={this.handleSubMenu}
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
const Logged = ({ logout, history, id, displaySubMenu, handleSubMenu }) => {
  return (
    <div className={styles.headerLogged}>
      <ul className={styles.navLogged}>
        <li>
          <button className={styles.button} onClick={() => history.push("/")}>
            Main page
          </button>
        </li>
        <li>
          <button
            className={styles.button}
            onClick={() => history.push("/create")}
          >
            New post
          </button>
        </li>
        <li>
          <button
            className={styles.button}
            onClick={() => history.push("/events")}
          >
            Events
          </button>
        </li>
      </ul>
      <ul className={styles.navLogged}>
        <li className={styles.dropdown}>
          <button className={styles.button}>User</button>
          <ul className={styles.subMenu}>
            <li>
              <button className={styles.button} onClick={logout}>
                Logout
              </button>
            </li>
            <li>
              <button
                className={styles.button}
                onClick={() => history.push(`/user/${id}`)}
              >
                Profile
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

// If the User not logged
const NotLogged = ({ history }) => {
  return (
    <div className={styles.headerNotLogged}>
      <ul className={styles.navNotLogged}>
        <li>
          <button
            className={styles.button}
            onClick={() => history.push("/login")}
          >
            Sign in
          </button>
        </li>
        <li>
          <button
            className={styles.button}
            onClick={() => history.push("/registration")}
          >
            Sign up
          </button>
        </li>
      </ul>
    </div>
  );
};

export default connect(null, { clearUserProfile })(Header);
