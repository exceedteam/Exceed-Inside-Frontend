import {
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  FETCH_ALL_EVENTS_PROCESS,
  FETCH_ALL_EVENTS_SUCCESS,
  FETCH_ALL_EVENTS_FAIL,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  EDIT_SUBSCRIBE_TO_EVENT,
  EDIT_UNSUBSCRIBE_TO_EVENT,
  EDIT_SUBSCRIBE_TO_ALL_EVENTS,
  EDIT_UNSUBSCRIBE_TO_ALL_EVENTS,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_FAIL
} from "../actionTypes";

const initialState = {
  errors: null,
  events: [],
  loading: false
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
      return {
        ...state,
        errors: errors,
        loading: false
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
        events: [...updatedEvents]
      };
    }
    case CREATE_EVENT_SUCCESS: {
      const { event } = action.payload;
      return {
        ...state,
        events: [event, ...state.events],
        loading: false
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
        events: [...events]
      };
    }
    case EDIT_SUBSCRIBE_TO_EVENT:
    case EDIT_UNSUBSCRIBE_TO_EVENT:
    case EDIT_SUBSCRIBE_TO_ALL_EVENTS:
    case EDIT_UNSUBSCRIBE_TO_ALL_EVENTS: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
