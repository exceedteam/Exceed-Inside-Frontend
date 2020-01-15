import {
  EDIT_LIKE_OF_POST_SUCCESS,
  EDIT_DISLIKE_OF_POST_SUCCESS
} from "../../actionTypes";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

// server request for like post
export const likePost = post => {
  return dispatch => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${url}/post/${post.id}/like`,
        {},
        { headers: { authorization: token } }
      )
      .then(response => {
        dispatch(likeSuccess(response.data));
      });
  };
};

// server request for dislike post
export const dislikePost = post => {
  return dispatch => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${url}/post/${post.id}/dislike`,
        {},
        {
          headers: { authorization: token }
        }
      )
      .then(response => {
        dispatch(dislikeSuccess(response.data));
      });
  };
};

export const likeSuccess = post => {
  return {
    type: EDIT_LIKE_OF_POST_SUCCESS
  };
};

export const dislikeSuccess = post => {
  return {
    type: EDIT_DISLIKE_OF_POST_SUCCESS
  };
};
