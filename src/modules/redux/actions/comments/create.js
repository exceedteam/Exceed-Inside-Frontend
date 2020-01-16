import {
  CREATE_COMMENT_PROCESS,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL
} from "../../actionTypes";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

// request to create a comment for post from the server
export const createComment = ({ commentText, id }) => {
  return dispatch => {
    dispatch(createCommentProcess());
    const token = localStorage.getItem("token");
    return axios
      .post(
        `${url}/post/${id}/comment`,
        { text: commentText },
        {
          headers: { authorization: token }
        }
      )
      .then(response => {
        return dispatch(createCommentSuccess(response.data));
      })
      .catch(error => {
        return dispatch(createCommentFail(error));
      });
  };
};

export const createCommentProcess = () => {
  return {
    type: CREATE_COMMENT_PROCESS,
    payload: {}
  };
};

export const createCommentSuccess = comments => {
  return {
    type: CREATE_COMMENT_SUCCESS,
    payload: { comments }
  };
};

export const createCommentFail = error => {
  return {
    type: CREATE_COMMENT_FAIL,
    payload: { error }
  };
};
