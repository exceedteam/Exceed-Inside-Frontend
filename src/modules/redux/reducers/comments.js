import {
  FETCH_COMMENTS_OF_POST_PROCESS,
  FETCH_COMMENTS_OF_POST_SUCCESS,
  FETCH_COMMENTS_OF_POST_FAIL,
  CREATE_COMMENT_PROCESS,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  FETCH_NEW_COMMENT
} from "../actionTypes";

const initialState = {
  errors: null,
  comments: [],
  // subcomments: [],
  loading: false,
  newComment: [],
  errorOfCreateComment: null,
  loadingNewComment: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    // get comments of post
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
        comments: [...state.comments, ...comments]
      };
    }

    case FETCH_NEW_COMMENT: {
      const { comment } = action.payload;
      return {
        ...state,
        comments: [comment, ...state.comments]
      };
    }
    // create comment
    case CREATE_COMMENT_PROCESS: {
      return {
        ...state,
        loadingNewComment: true
      };
    }
    case CREATE_COMMENT_SUCCESS: {
      const { comments } = action.payload;
      return {
        ...state,
        loadingNewComment: false,
        comments: [...comments]
      };
    }
    case CREATE_COMMENT_FAIL: {
      const { errorOfCreateComment } = action.payload;
      return {
        ...state,
        loadingNewComment: false,
        errorOfCreateComment: errorOfCreateComment
      };
    }
    default:
      return state;
  }
}
