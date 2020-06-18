// client routers

import React from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from './components/Login';
import Registration from './components/Registration';
import Header from './components/Header';
import Posts from './components/Main';
import Profile from './components/Profile';
import PostCreator from './components/PostCreator';
import Events from './components/Events';
import Post from './components/Post';
import PostsOfUser from './components/PostsOfUser';
import ModalWindow from './components/Modal';
import AlertMessage from '../common/AlertMessage';
import LeftMenu from './components/LeftMenu';
import GoogleCalendar from './components/GoogleCalendar';

import { getIsLogin } from '../../services/helpers';
import '../styles/index.scss';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.customHistory = createBrowserHistory();
    this.state = {
      isLogged: getIsLogin()
    };
  }
  
  handleLogin = (isLogged = false) => {
    this.setState({ isLogged });
  };
  
  render() {
    return (
      <div className='client'>
        <Router history={this.customHistory}>
          <Header
            isLogged={this.state.isLogged}
            handleLogin={this.handleLogin}
          />
          
          <AlertMessage type='events' />
          <Switch>
            <Route
              path='/login'
              component={(props) => (
                <Login {...props} handleLogin={this.handleLogin} />
              )}
            />
            <Route path='/registration' component={Registration} />
            <WithToken>
              <div className='client__container'>
                <LeftMenu />
                <div className='content'>
                  <Route
                    exact
                    path='/'
                    component={(props) => (
                      <Posts {...props} handleLogin={this.handleLogin} />
                    )}
                  />
                  <Route exact path='/user/:id' component={Profile} />
                  <Route exact path='/create' component={PostCreator} />
                  <Route exact path='/events' component={Events} />
                  <Route exact path='/post/:id' component={Post} />
                  <Route exact path='/user/:id/posts' component={PostsOfUser} />
                  <Route exact path='/modal' component={ModalWindow} />
                  <Route exact path='/calendar' component={GoogleCalendar} />
                </div>
              </div>
            </WithToken>
          </Switch>
          <footer />
        </Router>
      </div>
    );
  }
}

const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href =
  'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);

// if there is no token in local storage go to the login form
const WithToken = ({
                     children,
                     defaultComponent = <Redirect to='/login' />
                   }) => {
  if (getIsLogin()) {
    return children;
  }
  return defaultComponent;
};
