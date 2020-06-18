import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';
import auth from './auth';
import events from './events';
import comments from './comments';

export default combineReducers({ auth, posts, users, events, comments });
