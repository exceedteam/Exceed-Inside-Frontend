import {
  EDIT_LIKE_OF_POST_SUCCESS,
  EDIT_DISLIKE_OF_POST_SUCCESS,
  CLEAR_CURRENT_POST,
  CLEAR_ALL_POSTS_OF_USER
} from "../../actionTypes";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

// server request for like post
export const likePost = id => {
  return dispatch => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${url}/post/${id}/like`,
        {},
        { headers: { authorization: token } }
      )
      .then(() => {
        dispatch({ type: EDIT_LIKE_OF_POST_SUCCESS });
      });
  };
};

// server request for dislike post
export const dislikePost = id => {
  return dispatch => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${url}/post/${id}/dislike`,
        {},
        {
          headers: { authorization: token }
        }
      )
      .then(() => {
        dispatch({ type: EDIT_DISLIKE_OF_POST_SUCCESS });
      });
  };
};

// remove data of current post from the store
export const clearCurrentPost = () => {
  return {
    type: CLEAR_CURRENT_POST
  };
};

// remove data of posts of user from the store
export const clearPostsOfUser = () => {
  return {
    type: CLEAR_ALL_POSTS_OF_USER
  };
};
