import {
  FETCH_USER_PROFILE_FAIL,
  FETCH_USER_PROFILE_PROCESS,
  FETCH_USER_PROFILE_SUCCESS,
} from "../../actionTypes";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

// request to the server to get user data
export const fetchUserProfile = (id) => {
  return (dispatch) => {
    dispatch(fetchUserProfileProcess());
    const token = localStorage.getItem("token");
    return (
      axios
        .get(`${url}/user/${id}`, {
          headers: { authorization: token },
        })
        .then(response => {
          dispatch(fetchUserProfileSuccess(response.data))
          return response.data
        })
        .catch(error => {
          dispatch(fetchUserProfileFail(error))
        })
    );
  };
};

export const fetchUserProfileSuccess = (profile) => {
  return {
    type: FETCH_USER_PROFILE_SUCCESS,
    payload: { profile }
  }
};

export const fetchUserProfileProcess = () => {
  return {
    type: FETCH_USER_PROFILE_PROCESS,
    payload: {}
  }
};

export const fetchUserProfileFail = (error) => {
  return {
    type: FETCH_USER_PROFILE_FAIL,
    payload: { error }
  }
};