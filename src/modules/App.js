import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './client';
import Admin from './admin';

import store from './redux/store';

const App = () => {
  return (
    <div className='wrapper'>
      <Provider store={store}>
        <Switch>
          <Route exact path='/admin*' component={Admin} />
          <Route path='/' component={Main} />
        </Switch>
      </Provider>
    </div>
  );
};

export default App;
