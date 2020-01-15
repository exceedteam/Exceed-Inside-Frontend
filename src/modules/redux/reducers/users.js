import {
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAIL,
  FETCH_USER_PROFILE_PROCESS,
  EDIT_USER_PROFILE_FAIL,
  EDIT_USER_PROFILE_PROCESS,
  EDIT_USER_PROFILE_SUCCESS,
} from '../actionTypes';

const initialState = {
  errors: null,
  currentUser: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case EDIT_USER_PROFILE_PROCESS:
    case FETCH_USER_PROFILE_PROCESS: {
      return {
        ...state,
        loading: true,
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
    case EDIT_USER_PROFILE_FAIL:
    case FETCH_USER_PROFILE_FAIL: {
      const { errors } = action.payload;
      return {
        ...state,
        errors: errors,
        loading: false
      };
    }
    default:
      return state;
  }
}
