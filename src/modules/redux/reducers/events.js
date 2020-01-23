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
  EDIT_SUBSCRIBTION_TO_ALL_EVENTS_PROCESS
} from "../actionTypes";

const initialState = {
  errors: null,
  events: [],
  loading: false,
  internalLoading: false
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
        events: [...events]
      };
    }
    case EDIT_SUBSCRIBE_TO_EVENT:
    case EDIT_UNSUBSCRIBE_TO_EVENT:
    case EDIT_SUBSCRIBE_TO_ALL_EVENTS:
    case EDIT_UNSUBSCRIBE_TO_ALL_EVENTS: {
      return {
        ...state,
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
    default:
      return state;
  }
}
