// admin routers
import React from 'react';
import './index.scss';

import { Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { getIsLogin, getIsAdmin } from '../../services/helpers';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UserListPage from './containers/Users';
import Header from './components/Header';
import Comments from './components/Comments';
import Posts from './components/Posts';
import Events from './components/Events';

import Footer from './components/Footer';

export default class Admin extends React.Component {
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
      <WithToken>
        <div className='admin'>
          <Sidebar>
            <div className='admin-container'>
              <div className='admin-content'>
                <Header
                  history={this.customHistory}
                  isLogged={this.state.isLogged}
                  handleLogin={this.handleLogin}
                />
                <Switch>
                  {/* <Route */}
                  {/*  exact */}
                  {/*  path='/admin' */}
                  {/*  component={props => <Dashboard {...props} handleLogin={this.handleLogin} />} */}
                  {/* /> */}
                  <Route
                    exact
                    path='/admin/dashboard'
                    component={props => <Dashboard {...props} handleLogin={this.handleLogin} />}
                  />
                  <Route exact path='/admin/profile' component={Dashboard} />
                  <Route exact path='/admin/users' component={UserListPage} />
                  <Route exact path='/admin/posts' component={Posts} />
                  <Route exact path='/admin/comments' component={Comments} />
                  <Route exact path='/admin/events' component={Events} />
                  <Route exact path='/admin/home'>
                    <h1>Home</h1>
                  </Route>
                  <Redirect from='/admin' to='/admin/users' />
                  <Redirect from='/admin/*' to='/admin' />
                </Switch>
                <Footer />
              </div>
            </div>
          
          </Sidebar>
        </div>
      </WithToken>
    );
  }
}


// if there is no token in local storage go to the login form
const WithToken = ({
                     children, defaultComponent = <Redirect to='/login' />
                   }) => {
  if (getIsLogin() && getIsAdmin()) {
    return children;
  }
  return defaultComponent;
};
