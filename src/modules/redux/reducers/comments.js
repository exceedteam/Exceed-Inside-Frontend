import {
  FETCH_COMMENTS_OF_POST_PROCESS,
  FETCH_COMMENTS_OF_POST_SUCCESS,
  FETCH_COMMENTS_OF_POST_FAIL
} from "../actionTypes";

const initialState = {
  errors: null,
  comments: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS_OF_POST_PROCESS: {
      return {
        ...state,
        loading: true
      };
    }
    case FETCH_COMMENTS_OF_POST_FAIL: {
      const { errors } = action.payload;
      return {
        ...state,
        errors: errors,
        loading: false
      };
    }
    case FETCH_COMMENTS_OF_POST_SUCCESS: {
      const { comments } = action.payload;
      return {
        ...state,
        loading: false,
        comments: comments
      };
    }
    default:
      return state;
  }
}
