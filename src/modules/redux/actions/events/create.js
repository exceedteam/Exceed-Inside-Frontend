import axios from 'axios';
import { CREATE_EVENT_SUCCESS, CREATE_EVENT_FAIL, CREATE_EVENT_PROCESS } from '../../actionTypes';

const url = process.env.REACT_APP_API_URL;

// server request create the new event
export const createEvent = (event) => {
  return (dispatch) => {
    dispatch(createEventProcess());
    const token = localStorage.getItem('token');
    return axios
      .post(`${url}/event`, event, {
        headers: { authorization: token },
      })
      .then((response) => {
        dispatch(createEventSuccess(response.data));
        return { success: true };
      })
      .catch((errors) => {
        dispatch(createEventFail(errors));
        return { success: false };
      });
  };
};

export const createEventSuccess = (event) => {
  return {
    type: CREATE_EVENT_SUCCESS,
    payload: { event },
  };
};

export const createEventFail = (errors) => {
  return {
    type: CREATE_EVENT_FAIL,
    payload: { errors },
  };
};

export const createEventProcess = () => {
  return {
    type: CREATE_EVENT_PROCESS,
    payload: {},
  };
};
