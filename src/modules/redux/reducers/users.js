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
  FETCH_ALL_USERS_FAIL
} from "../actionTypes";

import { isInvalidToken } from "../../../services/helpers";

const initialState = {
  error: null,
  currentUser: {},
  loading: false,
  users: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_USERS_PROCESS:
    case EDIT_USER_PROFILE_PROCESS:
    case FETCH_USER_PROFILE_PROCESS: {
      return {
        ...state,
        loading: true
      };
    }
    case EDIT_USER_PROFILE_SUCCESS:
    case FETCH_USER_PROFILE_SUCCESS: {
      const { profile } = action.payload;
      return {
        ...state,
        currentUser: profile,
        loading: false
      };
    }
    case FETCH_ALL_USERS_SUCCESS: {
      const { users } = action.payload;
      return {
        ...state,
        users: [...state.users, ...users],
        loading: false
      };
    }
    case FETCH_ALL_USERS_FAIL:
    case EDIT_USER_PROFILE_FAIL:
    case FETCH_USER_PROFILE_FAIL: {
      const { error } = action.payload;
      isInvalidToken(error)
      return {
        ...state,
        error: error,
        loading: false
      };
    }
    case CLEAR_USER_PROFILE: {
      return {
        ...state,
        currentUser: {}
      };
    }
    default:
      return state;
  }
}
