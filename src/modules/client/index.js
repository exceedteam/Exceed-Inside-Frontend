//client routers

import React from "react";
import Login from "../components/Login";
import Registration from "./components/Registration";
import Header from "./components/Header";
import Post from "./components/Post";
import Posts from "./components/Main";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import PostOfUser from "./components/PostOfUser";
import Events from "./components/Events";

import { Switch, Route, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { getIslogin } from "../../services";

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.customHistory = createBrowserHistory();
    this.state = {
      isLogined: getIslogin()
    };
  }

  handleLogin = (isLogined = false) => {
    this.setState({ isLogined });
  };

  render() {
    return (
      <Router history={this.customHistory}>
        <Header history={this.customHistory} isLogined={this.state.isLogined} handleLogin={this.handleLogin} />
        <Switch>
          <Route path="/login" component={props => <Login {...props} handleLogin={this.handleLogin} />} />
          <Route path="/registration" component={Registration} />

          <WithToken>
            <Route exact path="/" component={props => <Posts {...props} handleLogin={this.handleLogin} />} />
            <Route path="/post/:id" component={Post} />
            <Route path="/profile" component={Profile} />
            <Route path="/createPost" component={CreatePost} />
            <Route path="/postOfUser" component={PostOfUser} />
            <Route path="/events" component={Events} />
          </WithToken>
        </Switch>
        <footer></footer>
      </Router>
    );
  }
}

const WithToken = ({ children, defaultComponent = <Redirect to="/login" /> }) => {
  if (getIslogin()) {
    return children;
  }
  return defaultComponent;
};
