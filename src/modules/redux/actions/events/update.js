import {
  EDIT_SUBSCRIBE_TO_EVENT,
  EDIT_UNSUBSCRIBE_TO_EVENT,
  EDIT_SUBSCRIBE_TO_ALL_EVENTS,
  EDIT_UNSUBSCRIBE_TO_ALL_EVENTS
} from "../../actionTypes";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

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
export const unsubToAllEvents = events => {
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

export const subToEventSuccess = event => {
  return {
    type: EDIT_SUBSCRIBE_TO_EVENT
  };
};

export const unsubToEventSuccess = event => {
  return {
    type: EDIT_UNSUBSCRIBE_TO_EVENT
  };
};

export const subToAllEventsSuccess = event => {
  return {
    type: EDIT_SUBSCRIBE_TO_ALL_EVENTS
  };
};

export const unsubToAllEventsSuccess = event => {
  return {
    type: EDIT_UNSUBSCRIBE_TO_ALL_EVENTS
  };
};
