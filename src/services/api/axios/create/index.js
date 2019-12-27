/*
  All create requests
*/
import axios from "axios";
import { getAuthorById } from "../get/index";
const url = process.env.REACT_APP_API_URL;

// create post
const createPost = data => {
  const token = localStorage.getItem("token");
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

// create the new event
const createEvent = data => {
  const token = localStorage.getItem("token");
  return axios
    .post(`${url}/event`, data  , {
      headers: { authorization: token }
    })
    .then(res => {
      if (res) return true;
    })
    .catch(err => {
      const error = err.response.data;
      return error;
    });
};

// create the new comment of post
const createComment = comment => {
  const token = localStorage.getItem("token");
  return (
    axios
      .post(
        `${url}/post/${comment.data.postId}/comment`,
        {
          text: comment.data.comment,
          mentionedUser: comment.data.mentionedUser
        },
        {
          headers: { authorization: token }
        }
      )
      .then(response => {
        return response.data.map(async data => {
          const author = await getAuthorById(data.authorId);
          return {
            ...data,
            author
          };
        });
      })
      .then(comments => {
        return Promise.all(comments);
      })
      // return all data
      .then(data => {
        return data;
      })
  );
};

export { createPost, createEvent, createComment };
