//client routers

import React from "react";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Header from "./components/Header";
import Posts from "./components/Main";
import Profile from "./components/Profile";
import PostCreator from "./components/PostCreator";
import Events from "./components/Events";
import Post from "./components/Post";
import PostsOfUser from "./components/PostsOfUser";
import ModalWindow from "./components/Modal";

import { Provider } from "react-redux";
import store from "../redux/store";

import { Switch, Route, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { getIslogin } from "../../services/helpers";

export default class Main extends React.Component {
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
      <Provider store={store}>
        <Router history={this.customHistory}>
          <Header
            history={this.customHistory}
            isLogged={this.state.isLogged}
            handleLogin={this.handleLogin}
          />
          <Switch>
            <Route
              path="/login"
              component={props => (
                <Login {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route path="/registration" component={Registration} />

            <WithToken>
              <Route
                exact
                path="/"
                component={props => (
                  <Posts {...props} handleLogin={this.handleLogin} />
                )}
              />
              <Route exact path="/user/:id" component={Profile} />
              <Route exact path="/create" component={PostCreator} />
              <Route exact path="/events" component={Events} />
              <Route exact path="/post/:id" component={Post} />
              <Route exact path="/user/:id/posts" component={PostsOfUser} />
              <Route exact path="/modal" component={ModalWindow} />
            </WithToken>
          </Switch>
          <footer />
        </Router>
      </Provider>
    );
  }
}

//if there is no token in local storage go to the login form
const WithToken = ({
  children,
  defaultComponent = <Redirect to="/login" />
}) => {
  if (getIslogin()) {
    return children;
  }
  return defaultComponent;
};
