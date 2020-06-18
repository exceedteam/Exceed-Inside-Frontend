import Immutable from 'seamless-immutable';
import { normalize } from 'normalizr';
import { isInvalidToken, union } from '../../../services/helpers';
import { commentListSchema } from '../../../services/shemes/comment.shema';
import {
  CLEAR_CURRENT_COMMENTS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_PROCESS,
  CREATE_COMMENT_SUCCESS,
  EDIT_COMMENT_FAIL,
  EDIT_COMMENT_PROCESS,
  EDIT_COMMENT_SUCCESS,
  FETCH_COMMENTS_OF_POST_FAIL,
  FETCH_COMMENTS_OF_POST_PROCESS,
  FETCH_COMMENTS_OF_POST_SUCCESS,
  FETCH_NEW_COMMENT_FROM_SOCKET,
  USER_WITHOUT_NAME
} from '../actionTypes';

const initialState = {
  errors: null,
  normalizedComments: Immutable({}),
  displayComments: [],
  loading: false,
  errorOfCreateComment: null,
  errorOfEditComment: null,
  loadingNewComment: false,
  message: ''
};

export const getCommentById = (state = initialState, commentId) => {
  return state.normalizedComments[commentId] || {};
};

export const getSubCommentsByCommentIdFromState = (state = initialState, parentCommentId) => {
  const commentsInState = Object.keys(state.normalizedComments);
  const subCommentsInParentComment = state.normalizedComments[parentCommentId].answeredUser;
  const intersection = commentsInState.filter(x => subCommentsInParentComment.includes(x));
  return intersection.sort((idA, idB) => {
    const commentA = getCommentById(state, idA);
    const commentB = getCommentById(state, idB);
    return new Date(commentA.createdAt).valueOf() - new Date(commentB.createdAt).valueOf();
  });
};

export const hasCommentById = (state = initialState, commentId) => {
  return Object.prototype.hasOwnProperty.call(state.normalizedComments, commentId);
};

export const getCommentListByPostId = (state = initialState, postId) => {
  return Object.keys(state.normalizedComments)
    .filter(commentId => state.normalizedComments[commentId].postId === postId);
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
      const { error } = action.payload;
      isInvalidToken(error);
      return {
        ...state,
        errors: error,
        loading: false
      };
    }
    case FETCH_COMMENTS_OF_POST_SUCCESS: {
      const { comments } = action.payload;
      const commentsWithoutParent = comments.filter(c => !c.parent).map(c => c.id);
      
      const normalizedData = normalize(comments, commentListSchema);
      return {
        ...state,
        loading: false,
        displayComments: union(state.displayComments, commentsWithoutParent),
        normalizedComments: Immutable.merge(state.normalizedComments, normalizedData.entities.comments)
      };
    }
    case FETCH_NEW_COMMENT_FROM_SOCKET: {
      const { comment } = action.payload;
      const { parent: parentId } = comment;
      
      
      const parentComment = getCommentById(state, parentId);
      
      const addToAnswered = (answered, id) => {
        return [ id, ...answered ];
      };
      
      const updatedParentComment = parentComment.id ? Immutable.update(parentComment, 'answeredUser', addToAnswered, comment.id) : null;
      const normalizedComment = normalize([ updatedParentComment, comment ], commentListSchema);
      const normalizedComments = Immutable.merge(state.normalizedComments, normalizedComment.entities.comments);
      
      
      return {
        ...state,
        displayComments: union([ !parentId ? comment.id : null ], state.displayComments),
        normalizedComments
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
      return {
        ...state,
        loadingNewComment: false
      };
    }
    case CREATE_COMMENT_FAIL: {
      const { error } = action.payload;
      isInvalidToken(error);
      return {
        ...state,
        loadingNewComment: false,
        errorOfCreateComment: error
      };
    }
    // edit comment
    case EDIT_COMMENT_PROCESS: {
      return {
        ...state,
        loadingNewComment: true
      };
    }
    case EDIT_COMMENT_SUCCESS: {
      try {
        const { comment } = action.payload;
        const oldComment = getCommentById(state, comment.id);
        const updatedComment = Immutable.merge(oldComment, comment);
        const normalizedComment = normalize([ updatedComment ], commentListSchema);
        const normalizedComments = Immutable.merge(state.normalizedComments, normalizedComment.entities.comments);
        
        return {
          ...state,
          normalizedComments
        };
      } catch (error) {
        console.log('Error', error);
        return {
          ...state
        };
      }
    }
    case EDIT_COMMENT_FAIL: {
      const { error } = action.payload;
      isInvalidToken(error);
      return {
        ...state,
        errorOfEditComment: error
      };
    }
    case CLEAR_CURRENT_COMMENTS: {
      return {
        ...state,
        displayComments: []
      };
    }
    case USER_WITHOUT_NAME: {
      return {
        ...state,
        message: 'Before writing a comment, fill in your name and surname in profile'
      };
    }
    default:
      return state;
  }
}
