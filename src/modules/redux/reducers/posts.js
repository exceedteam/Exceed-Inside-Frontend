import Immutable from 'seamless-immutable';
import { normalize } from 'normalizr';
import {
  FETCH_ALL_POSTS_SUCCESS,
  FETCH_ALL_POSTS_FAIL,
  FETCH_ALL_POSTS_PROCESS,
  FETCH_NEW_POST_FROM_SOCKET,
  FETCH_LIKE_FROM_SOCKET,
  FETCH_COMMENT_COUNTER_FROM_SOCKET,
  CREATE_POST_SUCCESS,
  CREATE_POST_PROCESS,
  CREATE_POST_FAIL,
  EDIT_LIKE_OF_POST_SUCCESS,
  EDIT_DISLIKE_OF_POST_SUCCESS,
  // for post page
  FETCH_POST_PROCESS,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
  // for posts of user
  FETCH_ALL_POSTS_OF_USER_PROCESS,
  FETCH_ALL_POSTS_OF_USER_SUCCESS,
  FETCH_ALL_POSTS_OF_USER_FAIL,
  CLEAR_ALL_POSTS_OF_USER,
  CLEAR_CURRENT_POST,
  SHOW_CURRENT_POST
} from '../actionTypes';

import { isInvalidToken, union } from '../../../services/helpers';
import {
  postListSchema,
} from '../../../services/shemes/post.shema';

const initialState = {
  errors: null,
  posts: Immutable({}),
  displayPosts: [],
  isPostPreview: false,
  loading: false,
  postsLoaded: false,
  errorsPostsOfUser: null,
  postsOfUser: [],
  loadingPostsOfUser: false
};

export const getPostById = (state= initialState, postId) => {
  return state.posts[postId] || {};
};
export const hasPostById = (state= initialState, postId) => {
  return Object.prototype.hasOwnProperty.call(state.posts, postId);
};

export const getLikesInfoByPostId = (store, postId) => {
  const defaultInfo = {
    likeCounter: 0,
    dislikeCounter: 0,
    commentCounter: 0,
    likesUsers: [],
    dislikesUsers: []
  };
  
  try {
    const currentPost = getPostById(store.posts, postId);
    
    return {
      likeCounter: currentPost.likeCounter,
      dislikeCounter: currentPost.dislikeCounter,
      commentCounter: currentPost.commentsCounter,
      likesUsers: currentPost.likesUsers,
      dislikesUsers: currentPost.dislikesUsers
    };
    
  } catch (e) {
    return defaultInfo;
  }
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_NEW_POST_FROM_SOCKET: {
      const { post } = action.payload;
      const normalizedData = normalize([post], postListSchema);
  
      return {
        ...state,
        posts: Immutable.merge(state.posts, normalizedData.entities.posts),
        displayPosts: union( normalizedData.result, state.displayPosts),
      };
    }
    case CREATE_POST_PROCESS:
    case FETCH_ALL_POSTS_PROCESS:
    case FETCH_POST_PROCESS: {
      return {
        ...state,
        loading: true
      };
    }
    case CREATE_POST_FAIL:
    case FETCH_ALL_POSTS_FAIL:
    case FETCH_POST_FAIL: {
      const { error } = action.payload;
      isInvalidToken(error);
      return {
        ...state,
        errors: error,
        loading: false
      };
    }
    case FETCH_ALL_POSTS_SUCCESS: {
      try {
        const { posts } = action.payload;
        const normalizedData = normalize(posts, postListSchema);
        return {
          ...state,
          // eslint-disable-next-line max-len
          posts: Immutable.merge(state.posts, normalizedData.entities.posts),
          displayPosts: union(state.displayPosts, normalizedData.result),
          loading: false,
          postsLoaded: true
        };
      } catch (e) {
        return {
          ...state,
          loading: false,
          errors: e.message
        };
      }
      
    }
    case CREATE_POST_SUCCESS: {
      const { post } = action.payload;
      const normalizedData = normalize([post], postListSchema)
      return {
        ...state,
        posts: Immutable.merge(state.posts, normalizedData.entities.posts),
        postsLoaded: true,
        loading: false
      };
    }
    case EDIT_DISLIKE_OF_POST_SUCCESS:
    case EDIT_LIKE_OF_POST_SUCCESS: {
      return {
        ...state
      };
    }
    case FETCH_POST_SUCCESS: {
      const { post } = action.payload;
      const normalizedData = normalize([ post ], postListSchema);
      return {
        ...state,
        isPostPreview: true,
        posts: Immutable.merge(state.posts, normalizedData.entities.posts),
        loading: false
      };
    }
    case SHOW_CURRENT_POST: {
      return {
        ...state,
        isPostPreview: true
      };
    }
    case CLEAR_CURRENT_POST: {
      return {
        ...state,
        isPostPreview: false
      };
    }
    case CLEAR_ALL_POSTS_OF_USER: {
      return {
        ...state,
        postsOfUser: []
      };
    }
    case FETCH_LIKE_FROM_SOCKET: {
      const { likeCounter, dislikeCounter, id, likesUsers, dislikesUsers } = action.payload;
      
      const post = getPostById(state, id);
      
      const likeInfo = {
        dislikesUsers,
        likesUsers,
        likeCounter,
        dislikeCounter,
      }
      const likedPost = Immutable.merge(post, likeInfo);
      
      const normalizedData = normalize([ likedPost ], postListSchema);
      
      return {
        ...state,
        posts: Immutable.merge(state.posts, normalizedData.entities.posts)
      };
    }
    case FETCH_COMMENT_COUNTER_FROM_SOCKET: {
      const { commentsCounter, id } = action.payload;
      const post = getPostById(state, id)
      
      const commentInfo = {
        commentsCounter
      };
      const updatedPost = Immutable.merge(post, commentInfo);
      const normalizedData = normalize([ updatedPost ], postListSchema);
      return {
        ...state,
        posts: Immutable.merge(state.posts, normalizedData.entities.posts)
      };
    }
    
    // posts of user
    case FETCH_ALL_POSTS_OF_USER_PROCESS: {
      return {
        ...state,
        loadingPostsOfUser: true
      };
    }
    case FETCH_ALL_POSTS_OF_USER_SUCCESS: {
      const { postsOfUser } = action.payload;
      const normalizedData = normalize(postsOfUser, postListSchema);
      return {
        ...state,
        posts: Immutable.merge(state.posts, normalizedData.entities.posts),
        postsOfUser: union(state.postsOfUser, normalizedData.result),
        loadingPostsOfUser: false
      };
    }
    case FETCH_ALL_POSTS_OF_USER_FAIL: {
      const { error } = action.payload;
      isInvalidToken(error);
      return {
        ...state,
        errorsPostsOfUser: error,
        loadingPostsOfUser: false
      };
    }
    default:
      return state;
  }
}
