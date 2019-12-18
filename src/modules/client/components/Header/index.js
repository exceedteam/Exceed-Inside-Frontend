/*
  Component with which the application header is rendered
*/
import React from "react";
import styles from "./Header.module.css";
export default class Header extends React.Component {

  // Removing a token from the local storage and switching to the login page
  logout = () => {
    this.props.handleLogin(false);
    this.props.history.push('/login');
    localStorage.removeItem('token');
  }

  render() {
    const { isLogined } = this.props;
    if (isLogined) {
      return <Loginned history={this.props.history} logout={this.logout} />
    } else {
      return <NotLoginned login={this.login} registration={this.registration} history={this.props.history} />
    }
  }
}
// If the User loginned in
const Loginned = ({ logout, history }) => {
  return <div className={styles.headerLoginned}>
    <input type="button" className={styles.buttonLoginnedLeft} onClick={() => history.push('/')} value="Main page" />
    <div className={styles.buttonLoginnedRight}>
      <input type="button" className={styles.button} value="user" />
      <div className={styles.dropdownContent}>
        <div className={styles.column}>
          <input type="button" className={styles.headerButton} onClick={logout} value="Logout" />
          <input type="button" className={styles.headerButton} onClick={() => history.push('/profile/me')} value="Profile" />
        </div>
      </div>
    </div>
  </div>
}

// If the User not loginned
const NotLoginned = ({ history }) => {
  return <div className={styles.headerNotLoginned}>
    <input type="button" className={styles.buttonNotLoginned} onClick={() => history.push('/login')} value="Sign in" />
    <input type="button" className={styles.buttonNotLoginned} onClick={() => history.push('/registration')} value="Registration" />
  </div>
}