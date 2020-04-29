import {
  CLEAR_CURRENT_COMMENTS,
  EDIT_COMMENT_SUCCESS,
	EDIT_COMMENT_FAIL,
	EDIT_COMMENT_PROCESS,
} from "../../actionTypes";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const clearCurrentComments = () => {
  return {
    type: CLEAR_CURRENT_COMMENTS,
  };
};

// request to create a comment for post from the server
export const editComment = ({ text, postId, commentId }) => {
  return (dispatch) => {
		dispatch(editCommentProcess());
		const token = localStorage.getItem("token");
    return axios
      .put(`${url}/post/${postId}/comment/${commentId}`, {text}, {
        headers: { authorization: token },
      })
      .then((response) => {
        return dispatch(editCommentSuccess(response.data));
      })
      .catch((error) => {
        return dispatch(editCommentFail(error));
      });
  };
};

export const editCommentProcess = () => {
	return {
		type: EDIT_COMMENT_PROCESS,
	}
}

export const editCommentSuccess = (comment) => {
  return {
    type: EDIT_COMMENT_SUCCESS,
    payload: { comment },
  };
};

export const editCommentFail = (error) => {
  return {
    type: EDIT_COMMENT_FAIL,
    payload: { error },
  };
};
