import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import socketMiddleware from './socketMiddleware'

export default createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware()))
);
