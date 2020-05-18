import {
  // create event
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_PROCESS,
  CREATE_EVENT_FAIL,
  // get all events
  FETCH_ALL_EVENTS_PROCESS,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_ALL_EVENTS_FAIL,
  // delete specific event
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  DELETE_EVENT_PROCESS,
  // edit specific event
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_PROCESS,
  EDIT_EVENT_FAIL,
  // operation with subscription
  EDIT_SUBSCRIBE_TO_EVENT,
  EDIT_UNSUBSCRIBE_TO_EVENT,
  EDIT_SUBSCRIBTION_TO_EVENT_PROCESS,
  EDIT_SUBSCRIBE_TO_ALL_EVENTS,
  EDIT_UNSUBSCRIBE_TO_ALL_EVENTS,
  EDIT_SUBSCRIBTION_TO_ALL_EVENTS_PROCESS,
  // remove message from the store
  CLEAR_MESSAGE
} from "../actionTypes";

import { isInvalidToken } from '../../../services/helpers';

const initialState = {
  errors: null,
  events: [],
  loading: false,
  internalLoading: false,
  message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_EVENTS_PROCESS: {
      return {
        ...state,
        loading: true
      };
    }
    case DELETE_EVENT_FAIL:
    case CREATE_EVENT_FAIL:
    case EDIT_EVENT_FAIL:
    case FETCH_ALL_EVENTS_FAIL: {
      const { errors } = action.payload;
      isInvalidToken(errors)
      return {
        ...state,
        errors: errors,
        loading: false,
        internalLoading: false
      };
    }
    case EDIT_EVENT_SUCCESS: {
      const { event } = action.payload;
      const { events } = state;
      const updatedEvents = events.map(specificEvent => {
        if (specificEvent.id === event.id) {
          specificEvent = event;
        }
        return specificEvent;
      });
      return {
        ...state,
        events: [...updatedEvents],
        internalLoading: false
      };
    }
    case CREATE_EVENT_SUCCESS: {
      const { event } = action.payload;
      return {
        ...state,
        events: [event, ...state.events],
        internalLoading: false
      };
    }
    case FETCH_ALL_EVENTS_SUCCESS: {
      const { events } = action.payload;
      return {
        ...state,
        loading: false,
        events: [...state.events, ...events]
      };
    }
    case DELETE_EVENT_SUCCESS: {
      const { events } = action.payload;
      return {
        ...state,
        loading: false,
        events: [...events],
        internalLoading: false
      };
    }
    case EDIT_SUBSCRIBE_TO_EVENT:{
      return {
        ...state,
        message: "you subscribed from the event",
        loading: false,
        internalLoading: false
      };
    }
    case EDIT_UNSUBSCRIBE_TO_EVENT: {
      return {
        ...state,
        message: "you have unsubscribed from the event",
        loading: false,
        internalLoading: false
      };
    }
    case EDIT_SUBSCRIBE_TO_ALL_EVENTS: {
      return {
        ...state,
        message: "you subscribed from the all events",
        loading: false,
        internalLoading: false
      };
    }
    case EDIT_UNSUBSCRIBE_TO_ALL_EVENTS: {
      return {
        ...state,
        message: "you unsubscribed from the all events",
        loading: false,
        internalLoading: false
      };
    }
    case DELETE_EVENT_PROCESS:
    case EDIT_EVENT_PROCESS:
    case EDIT_SUBSCRIBTION_TO_EVENT_PROCESS:
    case EDIT_SUBSCRIBTION_TO_ALL_EVENTS_PROCESS: {
      return {
        ...state,
        internalLoading: true
      };
    }
    case CREATE_EVENT_PROCESS: {
      return {
        ...state,
        internalLoading: true
      };
    }
    case CLEAR_MESSAGE: {
      return {
        ...state,
        message: ""
      }
    }
    default:
      return state;
  }
}
