import {
  EDIT_SUBSCRIBE_TO_EVENT,
  EDIT_UNSUBSCRIBE_TO_EVENT,
  EDIT_SUBSCRIBE_TO_ALL_EVENTS,
  EDIT_UNSUBSCRIBE_TO_ALL_EVENTS,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_FAIL
} from "../../actionTypes";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

// Sending a request to the server to change the event
export const editEvent = (data) => {
  return dispatch => {
    const token = localStorage.getItem("token");
    return axios
      .put(`${url}/event/${data.id}`, data.event, {
        headers: { authorization: token }
      })
      .then(response => {
        dispatch(editEventSuccess(response.data));
      })
      .catch(error => {
        dispatch(editEventFail(error));
      });
  };
};

export const editEventSuccess = event => {
  return {
    type: EDIT_EVENT_SUCCESS,
    payload: { event }
  };
};

export const editEventFail = errors => {
  return {
    type: EDIT_EVENT_FAIL,
    payload: { errors }
  };
};

// server request to subscribe to a specific event
export const subToEvent = event => {
  return dispatch => {
    const token = localStorage.getItem("token");
    return axios
      .put(`${url}/event/${event.id}/subscribe`, null, {
        headers: { authorization: token }
      })
      .then(response => {
        if (response.data.success) {
          dispatch(subToAllEventsSuccess());
        }
      });
  };
};

// server request to unsubscribe to a specific event
export const unsubToEvent = event => {
  return dispatch => {
    const token = localStorage.getItem("token");
    return axios
      .put(`${url}/event/${event.id}/unsubscribe`, null, {
        headers: { authorization: token }
      })
      .then(response => {
        if (response.data.success) {
          dispatch(unsubToEventSuccess());
        }
      });
  };
};

// server request to subscribe to all events
export const subToAllEvents = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    return axios
      .put(`${url}/events/subscribe`, null, {
        headers: { authorization: token }
      })
      .then(response => {
        if (response.data.success) {
          dispatch(subToAllEventsSuccess(response));
        }
      });
  };
};

// server request to unsubscribe to all events
export const unsubToAllEvents = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    return axios
      .put(`${url}/events/unsubscribe`, null, {
        headers: { authorization: token }
      })
      .then(response => {
        if (response.data.success) {
          dispatch(unsubToAllEventsSuccess());
        }
      });
  };
};

export const subToEventSuccess = () => {
  return {
    type: EDIT_SUBSCRIBE_TO_EVENT
  };
};

export const unsubToEventSuccess = () => {
  return {
    type: EDIT_UNSUBSCRIBE_TO_EVENT
  };
};

export const subToAllEventsSuccess = () => {
  return {
    type: EDIT_SUBSCRIBE_TO_ALL_EVENTS
  };
};

export const unsubToAllEventsSuccess = () => {
  return {
    type: EDIT_UNSUBSCRIBE_TO_ALL_EVENTS
  };
};
