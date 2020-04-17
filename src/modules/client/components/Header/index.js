/*
  Component with which the application header is rendered
*/
import React from "react";
import jwtDecode from "jwt-decode";
import { connect } from "react-redux";
import { clearUserProfile } from "../../../redux/actions/users/edit";
import { fetchUserProfile } from "../../../redux/actions/users/fetch";
import { Button, Dropdown } from "semantic-ui-react";
import "./header.scss";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'user',
      id: 'id',
    };
  }

  componentDidMount() {
    if (this.props.isLogged) {
      const { fetchUserProfile } = this.props;
      const id = this.getId();
      fetchUserProfile(id).then((user) => this.setState({ user: user }));
    }
  }

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
    const { isLogged, history } = this.props;
    const { user } = this.state;
    if (isLogged) {
      return (
        <Logged
          history={history}
          logout={this.logout}
          id={this.getId()}
          user={user}
        />
      );
    } else {
      return (
        <NotLogged
          login={this.login}
          registration={this.registration}
          history={history}
        />
      );
    }
  }
}

// If the User logged in
const Logged = ({ logout, history, id, user }) => {
  return (
    <div className="mainHeader">
      <div className="logoField">
        <div className="logoText">Exceed-Team</div>
      </div>
      <div className="navLoggedRight">
        <Dropdown
          text={user.firstName}
          floating
          labeled
          button
          icon="user"
          className="icon"
        >
          <Dropdown.Menu>
            <Dropdown.Item
              text="Profile"
              icon="address card"
              onClick={() => history.push(`/user/${id}`)}
            />
            <Dropdown.Item text="Logout" icon="log out" onClick={logout} />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

// If the User not logged
const NotLogged = ({ history }) => {
  return (
    <div className="mainHeader">
      <div className="navNotLogged">
        <Button onClick={() => history.push("/login")}>Sign in</Button>
        <Button onClick={() => history.push("/registration")}>Sign up</Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.users.currentUser,
  };
};

export default connect(mapStateToProps, { clearUserProfile, fetchUserProfile })(
  Header
);
