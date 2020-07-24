import Immutable from 'seamless-immutable';
import { normalize } from 'normalizr';
import {
  FETCH_USER_PROFILE_SUCCESS, FETCH_USER_PROFILE_FAIL, FETCH_USER_PROFILE_PROCESS,
  EDIT_USER_PROFILE_FAIL, EDIT_USER_PROFILE_PROCESS, EDIT_USER_PROFILE_SUCCESS,
  CLEAR_USER_PROFILE,
  FETCH_ALL_USERS_PROCESS, FETCH_ALL_USERS_SUCCESS, FETCH_ALL_USERS_FAIL,
  CLEAR_MESSAGE, REGISTER_SUCCESS,
  ONCHANGE_SEARCH,
  SELECT_PROFILE, EDIT_USER_PROFILE_CANCEL,
  ADD_USER_ACCOUNT_SUCCESS,
  ADD_USER_ACCOUNT_FAIL
} from '../actionTypes';

import {
  filterArrayOfObjectByKeys,
  isInvalidToken,
  union
} from '../../../services/helpers';
import { usersListSchema } from '../../../services/shemes/user.shema';

const initialState = {
  error: {},
  currentUser: '',
  displayUsers: [],
  pagination: {},
  loading: false,
  users: [],
  normalizedUsers: Immutable({}),
  profile: '',
  message: null
};

export const getAllIdsOfUsers = (state = initialState) => {
  return Object.keys(state.normalizedUsers);
};

export const getUserById = (state = initialState, userId) => {
  return state.normalizedUsers[userId] || {};
};

export const getUserMainInfoById = (state = initialState, userId) => {
  
  const user = state.normalizedUsers[userId];
  return {
    id: userId,
    email: user.email,
    fullName: user.fullName
  };
};

export const getUserAccountsInfoById = (state = initialState, userId) => {
  try {
    const user = state.normalizedUsers[userId] || {};
    return user.accounts || [];
  } catch (e) {
    return [];
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EDIT_USER_PROFILE_PROCESS: {
      const { profile } = action.payload;
      const immutableProfile = getUserById(state, profile.id);
      const updatedProfile = Immutable.merge(immutableProfile, profile);
      const normalizedData = normalize([ updatedProfile ], usersListSchema);
      
      return {
        ...state,
        normalizedUsers: Immutable.merge(state.normalizedUsers, normalizedData.entities.users)
      };
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
        normalizedUsers: Immutable.merge(state.normalizedUsers, normalizedData.entities.users),
        message: 'Successfully Updated'
      };
    }
    case FETCH_USER_PROFILE_SUCCESS: {
      const { profile } = action.payload;
      const normalizedData = normalize([ profile ], usersListSchema);
      return {
        ...state,
        currentUser: profile.id,
        normalizedUsers: Immutable.merge(state.normalizedUsers, normalizedData.entities.users),
        loading: false
      };
    }
    case FETCH_ALL_USERS_SUCCESS: {
      const { users, pagination } = action.payload;
      const normalizedData = normalize(users, usersListSchema);
      const displayUsers = union(state.displayUsers, normalizedData.result);
      return {
        ...state,
        normalizedUsers: Immutable.merge(state.normalizedUsers, normalizedData.entities.users),
        displayUsers,
        profile: displayUsers[0],
        users: [ ...state.users, ...users ], // TODO check and remove
        pagination,
        loading: false
      };
    }
    case ADD_USER_ACCOUNT_FAIL:
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
    case ADD_USER_ACCOUNT_SUCCESS: {
      const  { id, accounts } = action.payload;
      const user = getUserById(state, id);
      const updatedUser = Immutable.set(user, 'accounts', accounts);
      const normalizedUser = normalize([ updatedUser ], usersListSchema);
      return {
        ...state,
        normalizedUsers: Immutable.merge(state.normalizedUsers, normalizedUser.entities.users)
      };
    }
    case EDIT_USER_PROFILE_CANCEL: {
      return {
        ...state,
        error: {}
      };
    }
    case CLEAR_USER_PROFILE: {
      return {
        ...state,
        currentUser: '',
        error: {}
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
        displayUsers: union(normalizedData.result, state.displayUsers),
        profile: profile.id
      };
    }
    case ONCHANGE_SEARCH: {
      const value = action.payload.trim();
      const ids = getAllIdsOfUsers(state);
      const users = ids.map(id => getUserMainInfoById(state, id));
      if (value) {
        
        const filteredUsers = filterArrayOfObjectByKeys(value, users, [ 'email', 'fullName' ]);
        
        return {
          ...state,
          displayUsers: filteredUsers.map(u => u.id)
        };
      }
      
      return {
        ...state,
        displayUsers: ids
      };
      
    }
    case SELECT_PROFILE: {
      const id = action.payload;
      return {
        ...state,
        profile: id
      };
    }
    default:
      return state;
  }
}
