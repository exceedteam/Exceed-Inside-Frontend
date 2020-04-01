import {
  FETCH_ALL_POSTS_SUCCESS,
  FETCH_ALL_POSTS_FAIL,
  FETCH_ALL_POSTS_PROCESS,
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
  CLEAR_CURRENT_POST
} from "../actionTypes";

const initialState = {
  errors: null,
  posts: [],
  currentPostPreview: null,
  loading: false,
  postsLoaded: false,
  errorsPostsOfUser: null,
  postsOfUser: [],
  loadingPostsOfUser: false
};

export default function(state = initialState, action) {
  switch (action.type) {
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
      const { errors } = action.payload;
      return {
        ...state,
        errors: errors,
        loading: false
      };
    }
    case FETCH_ALL_POSTS_SUCCESS: {
      const { posts } = action.payload;
      return {
        ...state,
        posts: [...state.posts, ...posts],
        loading: false
      };
    }
    case CREATE_POST_SUCCESS: {
      const { posts } = action.payload;
      return {
        ...state,
        posts: [...posts],
        postsLoaded: true,
        loading: false,
      };
    }
    case EDIT_DISLIKE_OF_POST_SUCCESS:
    case EDIT_LIKE_OF_POST_SUCCESS: {
      return {
        ...state
      };
    }
    case FETCH_POST_SUCCESS: {
      const { id, post } = action.payload;
      let { currentPostPreview } = state;
      if (!post) {
        currentPostPreview = state.posts.filter(post => post.id === id)[0];
      } else {
        currentPostPreview = post;
      }
      return {
        ...state,
        currentPostPreview,
        loading: false
      };
    }
    case CLEAR_CURRENT_POST: {
      return {
        ...state,
        currentPostPreview: null
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
      const {posts, currentPostPreview} = state;
      posts.map(post => {
        if (post.id === id) {
          post.dislikesUsers = dislikesUsers;
          post.likesUsers = likesUsers;
          post.likeCounter = likeCounter;
          post.dislikeCounter = dislikeCounter;
        }
        return post;
      });

      if(!!currentPostPreview && currentPostPreview.id === id) {
        currentPostPreview.likeCounter = likeCounter;
        currentPostPreview.dislikeCounter = dislikeCounter;
      }

      return {
        ...state,
        posts: [...posts],
        currentPostPreview: currentPostPreview
      };
    }

    case FETCH_COMMENT_COUNTER_FROM_SOCKET: {
      const { commentsCounter, id } = action.payload;
      const { posts, currentPostPreview } = state;
      posts.map(post => {
        if (post.id === id) {
          post.commentsCounter = commentsCounter
        }
        return post;
      });
      if(!!currentPostPreview && currentPostPreview.id === id) {
        currentPostPreview.commentsCounter = commentsCounter
      }
      return {
        ...state
      }
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
      return {
        ...state,
        postsOfUser: [...state.postsOfUser, ...postsOfUser],
        loadingPostsOfUser: false
      };
    }
    case FETCH_ALL_POSTS_OF_USER_FAIL: {
      const { errorsPostsOfUser } = action.payload;
      return {
        ...state,
        errorsPostsOfUser: errorsPostsOfUser,
        loadingPostsOfUser: false
      };
    }
    default:
      return state;
  }
}
