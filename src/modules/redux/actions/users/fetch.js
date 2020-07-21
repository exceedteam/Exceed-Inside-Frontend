import axios from 'axios';
import {
  FETCH_USER_PROFILE_FAIL,
  FETCH_USER_PROFILE_PROCESS,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_ALL_USERS_PROCESS,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAIL,
  ONCHANGE_SEARCH,
  SELECT_PROFILE,
  EDIT_USER_PROFILE_CANCEL,
  REGISTER_CANCEL
} from '../../actionTypes';

const url = process.env.REACT_APP_API_URL;

// request to the server to get user data
export const fetchUserProfile = (id) => {
  return (dispatch) => {
    dispatch(fetchUserProfileProcess());
    const token = localStorage.getItem('token');
    return axios
      .get(`${url}/user/${id}`, {
        headers: { authorization: token }
      })
      .then((response) => {
        dispatch(fetchUserProfileSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(fetchUserProfileFail(error));
      });
  };
};

export const fetchUserProfileSuccess = (profile) => {
  return {
    type: FETCH_USER_PROFILE_SUCCESS,
    payload: { profile }
  };
};

export const fetchUserProfileProcess = () => {
  return {
    type: FETCH_USER_PROFILE_PROCESS,
    payload: {}
  };
};

export const fetchUserProfileFail = (error) => {
  return {
    type: FETCH_USER_PROFILE_FAIL,
    payload: { error }
  };
};

export const fetchAllUsers = (paginationInfo) => {
  return (dispatch) => {
    dispatch(fetchAllUsersProcess());
    const token = localStorage.getItem('token');
    return axios(`${url}/users`, {
      headers: { authorization: token }
    })
      .then((response) => {
        dispatch(fetchAllUsersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchAllUsersFail(error));
      });
  };
};

export const fetchAllUsersProcess = () => {
  return {
    type: FETCH_ALL_USERS_PROCESS
  };
};

export const fetchAllUsersSuccess = (payload) => {
  return {
    type: FETCH_ALL_USERS_SUCCESS,
    payload: {
      ...payload
    }
  };
};

export const fetchAllUsersFail = (error) => {
  return {
    type: FETCH_ALL_USERS_FAIL,
    payload: { error }
  };
};

export const onChangeSearch = (value) => {
  return {
    type: ONCHANGE_SEARCH,
    payload: value
  };
};

export const onSelectProfile = (value) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_USER_PROFILE_CANCEL
    });
    dispatch({
      type: REGISTER_CANCEL
    });
    dispatch({
      type: SELECT_PROFILE,
      payload: value
    });
  };
};
