/*
  All create requests
*/
import axios from "axios";
const url = process.env.REACT_APP_API_URL;

// create post
const createPost = data => {
  let token = localStorage.getItem("token");
  return axios
    .post(`${url}/post`, data.post, {
      headers: { authorization: token }
    })
    .then(post => {
      const id = post.data.id;
      return id;
    })
    .catch(err => {
      const error = err.response.data;
      return error;
    });
};

export { createPost };
