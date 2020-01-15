import axios from "axios";

import {
  LOGIN_PROCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_PROCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actionTypes";


const url = process.env.REACT_APP_API_URL;

export const register = (data) => {
  return (dispatch) => {
    dispatch(registerProcess());
    return axios
      .post(`${url}/user`, data
      )
      // Go to login page
      .then(res => {
        dispatch(registerSuccess(res.data));
        return { success: true }
      })
      // If the entered data is not correct display an error message
      .catch(err => {
        dispatch(registerFail(err.response.data));
        return { success: false }
      })
  };
};


export const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      success: true
    }
  }
};

export const registerFail = (data) => {
  return {
    type: REGISTER_FAIL,
    payload: {
      errors: data
    }
  }
};

export const registerProcess = (data) => {
  return {
    type: REGISTER_PROCESS,
    payload: {}
  }
};

export function login(data) {
  return (dispatch) => {
    dispatch(loginProcess());
    return axios
      .post(`${url}/login`, data
      )
      // Go to login page
      .then(res => {
        dispatch(loginSuccess(res.data))
        return {
          success: true
        }
      })
      // If the entered data is not correct display an error message
      .catch(err => {
        dispatch(loginFail(err.response.data));
        return {
          success: false
        }
      })
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      ...data
    }
  }
};

export const loginFail = (data) => {
  return {
    type: LOGIN_FAIL,
    payload: {
      errors: data
    }
  }
};

export const loginProcess = (data) => {
  return {
    type: LOGIN_PROCESS,
    payload: {}
  }
};

export function logout(data) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_PROCESS,
      payload: {}
    })
  }
}