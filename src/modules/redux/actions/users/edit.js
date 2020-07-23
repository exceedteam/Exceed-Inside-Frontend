import axios from 'axios';
import {
  // for profile page
  EDIT_USER_PROFILE_FAIL,
  EDIT_USER_PROFILE_PROCESS,
  EDIT_USER_PROFILE_SUCCESS,
  CLEAR_USER_PROFILE,
  ADD_USER_ACCOUNT_SUCCESS,
  ADD_USER_ACCOUNT_PROCESS,
  ADD_USER_ACCOUNT_FAIL
} from '../../actionTypes';

const url = process.env.REACT_APP_API_URL;

// server request to change profile data
export const editUserProfile = (profile) => {
  return (dispatch) => {
    dispatch(editUserProfileProcess(profile));
    const token = localStorage.getItem('token');
    return axios
      .put(`${url}/user/${profile.id}`, profile, {
        headers: { authorization: token }
      })
      .then((response) => {
        dispatch(editUserProfileSuccess(response.data));
        return ( { success: true } );
      })
      .catch((error) => {
        dispatch(editUserProfileFail(error.response.data));
        return ( { success: false } );
      });
  };
};

export const addUserAccountSuccess = (accountsInfo) => {
  return {
    type: ADD_USER_ACCOUNT_SUCCESS,
    payload: accountsInfo
  };
};

export const addUserAccountProcess = () => {
  return {
    type: ADD_USER_ACCOUNT_PROCESS,
  };
};

export const addUserAccountFail = (error) => {
  return {
    type: ADD_USER_ACCOUNT_FAIL,
    payload: { error }
  };
};

// server request to change profile accounts
export const addUserAccount = (id, account) => {
  return (dispatch) => {
    dispatch(addUserAccountProcess(account));
    const token = localStorage.getItem('token');
    return axios
      .put(`${url}/user/${id}/account`, account, {
        headers: { authorization: token }
      })
      .then((response) => {
        dispatch(addUserAccountSuccess(response.data));
        return ( { success: true } );
      })
      .catch((error) => {
        dispatch(addUserAccountFail(error.response.data));
        return ( { success: false } );
      });
  };
};

export const editUserProfileSuccess = (profile) => {
  return {
    type: EDIT_USER_PROFILE_SUCCESS,
    payload: { profile }
  };
};

export const editUserProfileProcess = (profile) => {
  return {
    type: EDIT_USER_PROFILE_PROCESS,
    payload: { profile }
  };
};

export const editUserProfileFail = (error) => {
  return {
    type: EDIT_USER_PROFILE_FAIL,
    payload: { error }
  };
};

// when logout the account, delete user data from the store
export const clearUserProfile = () => {
  return {
    type: CLEAR_USER_PROFILE
  };
};
