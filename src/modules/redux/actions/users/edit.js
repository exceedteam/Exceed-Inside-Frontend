import {
  // for profile page
  EDIT_USER_PROFILE_FAIL,
  EDIT_USER_PROFILE_PROCESS,
  EDIT_USER_PROFILE_SUCCESS,
} from "../../actionTypes";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

// server request to change profile data
export const editUserProfile = (profile) => {
  return (dispatch) => {
    dispatch(editUserProfileProcess());
    const token = localStorage.getItem("token");
    return (
      axios
        .put(`${url}/user/${profile.id}`, profile,{
          headers: { authorization: token },
        })
        .then(response => {
          dispatch(editUserProfileSuccess(response.data))
        })
        .catch(error => {
          dispatch(editUserProfileFail(error))
        })
    );
  };
};

export const editUserProfileSuccess = (profile) => {
  return {
    type: EDIT_USER_PROFILE_SUCCESS,
    payload: { profile }
  }
};

export const editUserProfileProcess = () => {
  return {
    type: EDIT_USER_PROFILE_PROCESS,
    payload: {}
  }
};

export const editUserProfileFail = (error) => {
  return {
    type: EDIT_USER_PROFILE_FAIL,
    payload: { error }
  }
};