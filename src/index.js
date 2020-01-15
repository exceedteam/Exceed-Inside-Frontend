import React from 'react';
import './index.css';
import App from './modules/App';
import * as serviceWorker from './serviceWorker';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
