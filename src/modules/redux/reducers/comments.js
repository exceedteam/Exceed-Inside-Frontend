import {
  FETCH_COMMENTS_OF_POST_PROCESS,
  FETCH_COMMENTS_OF_POST_SUCCESS,
  FETCH_COMMENTS_OF_POST_FAIL,
  CREATE_COMMENT_PROCESS,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  FETCH_NEW_COMMENT,
  CLEAR_CURRENT_COMMENTS,
  USER_WITHOUT_NAME
} from "../actionTypes";

const initialState = {
  errors: null,
  comments: [],
  loading: false,
  newComment: [],
  errorOfCreateComment: null,
  loadingNewComment: false,
  message: '',
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
      const { parent } = comment
      if (parent) {
        state.comments.map(comm => {
          if (parent === comm.id) {
            comm.answeredUser = [ comm.parent, ...comm.answeredUser]
          }
        })
      }
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
      const { comment } = action.payload;
      return {
        ...state,
        loadingNewComment: false,
        comments: [comment, ...state.comments]
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
    case CLEAR_CURRENT_COMMENTS: {
      return {
        ...state,
        comments: []
      }
    }
    case USER_WITHOUT_NAME: {
      return {
        ...state,
        message: "Before writing a comment, fill in your name and surname in profile",
      }
    }
    default:
      return state;
  }
}
