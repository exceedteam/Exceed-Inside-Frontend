//client routers

import React from "react";
import Login from "../components/Login";
import Registration from "./components/Registration";
import Header from "./components/Header";
import Post from "./components/Post";
import Posts from "./components/Main";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import PostsOfUser from "./components/PostsOfUser";
import Events from "./components/Events";

import { Switch, Route, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { getIslogin } from "../../services/helpers";

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.customHistory = createBrowserHistory();
    this.state = {
      isLogged: getIslogin()
    };
  }

  handleLogin = (isLogged = false) => {
    this.setState({ isLogged });
  };

  render() {
    return (
      <Router history={this.customHistory}>
        <Header history={this.customHistory} isLogged={this.state.isLogged} handleLogin={this.handleLogin} />
        <Switch>
          <Route path="/login" component={props => <Login {...props} handleLogin={this.handleLogin} />} />
          <Route path="/registration" component={Registration} />

          <WithToken>
            <Route exact path="/" component={props => <Posts {...props} handleLogin={this.handleLogin} />} />
            <Route exact path="/post/:id" component={Post} />
            <Route exact path="/user/:id" component={Profile} />
            <Route exact path="/createPost" component={CreatePost} />
            <Route exact path="/user/:id/posts" component={PostsOfUser} />
            <Route exact path="/events" component={Events} />
          </WithToken>
        </Switch>
        <footer></footer>
      </Router>
    );
  }
}

//if there is no token in local storage go to the login form
const WithToken = ({ children, defaultComponent = <Redirect to="/login" /> }) => {
  if (getIslogin()) {
    return children;
  }
  return defaultComponent;
};
