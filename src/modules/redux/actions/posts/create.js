import {
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
} from '../../actionTypes';
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

// server request to create a new post
export const createPost = post => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    return (
      axios
        .post(`${url}/post`, post, {
          headers: { authorization: token },
        })
        .then(response => {
          dispatch(createPostSuccess(response.data));
          return { success: true, id: response.data.id }
        })
        .catch(errors => {
          dispatch(createPostFail(errors));
          return { success: false }
        })
    );
  };
};

export const createPostSuccess = (post) => {
  return {
    type: CREATE_POST_SUCCESS,
    payload: { post }
  }
};

export const createPostFail = (errors) => {
  return {
    type: CREATE_POST_FAIL,
    payload: { errors }
  }
};