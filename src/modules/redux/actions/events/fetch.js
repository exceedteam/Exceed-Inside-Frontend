import {
  FETCH_ALL_EVENTS_PROCESS,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_ALL_EVENTS_FAIL
} from "../../actionTypes";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

// request all events from the server
export const fetchEvents = ({page = 0, perPage = 10}) => {
  return dispatch => {
    dispatch(fetchAllEventsProcess());
    const token = localStorage.getItem("token");
    return axios
      .get(`${url}/events?page=${page}&perPage=${perPage}`, {
        headers: { authorization: token }
      })
      .then(response => {
        dispatch(fetchAllEventsSuccess(response.data));
        return response.data
      })
      .catch(error => {
        dispatch(fetchAllEventsFail(error));
      });
  };
};

export const fetchAllEventsProcess = events => {
  return {
    type: FETCH_ALL_EVENTS_PROCESS,
    payload: {}
  };
};

export const fetchAllEventsFail = error => {
  return {
    type: FETCH_ALL_EVENTS_FAIL,
    payload: { error }
  };
};

export const fetchAllEventsSuccess = events => {
  return {
    type: FETCH_ALL_EVENTS_SUCCESS,
    payload: { events }
  };
};
