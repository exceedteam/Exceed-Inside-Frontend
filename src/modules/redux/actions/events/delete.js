import {
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  DELETE_EVENT_PROCESS
} from "../../actionTypes";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

// server request to delete an event
export const deleteEvent = event => {
  return dispatch => {
    dispatch(deleteEventProcess());
    const token = localStorage.getItem("token");
    return axios
      .delete(`${url}/event/${event.id}`, {
        headers: { authorization: token }
      })
      .then(response => {
        dispatch(deleteEventSuccess(response.data));
      })
      .catch(errors => {
        dispatch(deleteEventFail(errors));
      });
  };
};

export const deleteEventProcess = () => {
  return {
    type: DELETE_EVENT_PROCESS
  };
};

export const deleteEventSuccess = events => {
  return {
    type: DELETE_EVENT_SUCCESS,
    payload: { events }
  };
};

export const deleteEventFail = errors => {
  return {
    type: DELETE_EVENT_FAIL,
    payload: { errors }
  };
};
