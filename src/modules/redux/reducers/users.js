import Immutable from 'seamless-immutable';
import { normalize } from 'normalizr';
import {
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAIL,
  FETCH_USER_PROFILE_PROCESS,
  EDIT_USER_PROFILE_FAIL,
  EDIT_USER_PROFILE_PROCESS,
  EDIT_USER_PROFILE_SUCCESS,
  CLEAR_USER_PROFILE,
  FETCH_ALL_USERS_PROCESS,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAIL,
  CLEAR_MESSAGE, REGISTER_SUCCESS
} from '../actionTypes';

import { isInvalidToken, union } from '../../../services/helpers';
import { usersListSchema } from '../../../services/shemes/user.shema';

const initialState = {
  error: null,
  currentUser: {},
  displayUsers: [],
  pagination: {},
  loading: false,
  users: [],
  normalizedUsers: Immutable({}),
  savingProfile: null,
  message: null,
};

export const getUserById = (state = initialState, userId) => {
  return state.normalizedUsers[userId] || {};
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EDIT_USER_PROFILE_PROCESS: {
      const { profile } = action.payload;
      const immutableProfile = getUserById(state, profile.id);
      const updatedProfile = Immutable.merge(immutableProfile, profile);
      const normalizedData = normalize([updatedProfile], usersListSchema);
      
      return {
        ...state,
        normalizedUsers: Immutable.merge(state.normalizedUsers, normalizedData.entities.users),
        savingProfile: immutableProfile,
      }
    }
    case FETCH_ALL_USERS_PROCESS:
    case FETCH_USER_PROFILE_PROCESS: {
      return {
        ...state,
        loading: true
      };
    }
    case EDIT_USER_PROFILE_SUCCESS: {
      const { profile } = action.payload;
      const normalizedData = normalize([ profile ], usersListSchema);
      return {
        ...state,
        currentUser: profile,
        normalizedUsers: Immutable.merge(state.normalizedUsers, normalizedData.entities.users),
        savingProfile: null,
        message: 'Successfully Updated'
      };
    }
    case FETCH_USER_PROFILE_SUCCESS: {
      const { profile } = action.payload;
      const normalizedData = normalize([ profile ], usersListSchema);
      return {
        ...state,
        currentUser: profile,
        normalizedUsers: Immutable.merge(state.normalizedUsers, normalizedData.entities.users),
        loading: false,
      };
    }
    case FETCH_ALL_USERS_SUCCESS: {
      const { users, pagination } = action.payload;
      const normalizedData = normalize(users, usersListSchema);
      return {
        ...state,
        normalizedUsers: Immutable.merge(state.normalizedUsers, normalizedData.entities.users),
        displayUsers: union(state.displayUsers, normalizedData.result),
        users: [ ...state.users, ...users ],
        pagination,
        loading: false
      };
    }
    case FETCH_ALL_USERS_FAIL:
    case EDIT_USER_PROFILE_FAIL:
    case FETCH_USER_PROFILE_FAIL: {
      const { error } = action.payload;
      isInvalidToken(error);
      return {
        ...state,
        error,
        loading: false
      };
    }
    case CLEAR_USER_PROFILE: {
      return {
        ...state,
        currentUser: {}
      };
    }
    case CLEAR_MESSAGE.users: {
      return {
        ...state,
        message: ''
      };
    }
    case REGISTER_SUCCESS: {
      const { profile } = action.payload;
      const normalizedData = normalize([ profile ], usersListSchema);
      return {
        ...state,
        normalizedUsers: Immutable.merge(state.normalizedUsers, normalizedData.entities.users),
        displayUsers: union(normalizedData.result, state.displayUsers)
      };
    }
  
    default:
      return state;
  }
}
