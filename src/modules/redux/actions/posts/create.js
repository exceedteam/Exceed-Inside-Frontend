import axios from 'axios';
import { CREATE_POST_SUCCESS, CREATE_POST_FAIL } from '../../actionTypes';

const url = process.env.REACT_APP_API_URL;

// server request to create a new post
export const createPost = (post) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    return (
      axios
        .post(`${url}/post`, post, {
          headers: { authorization: token },
        })
        .then(() => {
          // dispatch(createPostSuccess(response.data));
          // return { success: true, id: response.data.id }
          return null
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

export const createPostFail = (error) => {
  return {
    type: CREATE_POST_FAIL,
    payload: { error }
  }
};
