/*
  All get requests
*/
import axios from "axios";
const url = process.env.REACT_APP_API_URL;

// get al of posts
const getPosts = config => {
  let token = localStorage.getItem("token");
  return axios
    .get(`${url}/posts`, {
      headers: { authorization: token },
      params: config.params
    })
    // find author of post
    .then(response => {
      return response.data.map(async post => {
        const author = await getAuthorById(post.authorId);
        return {
          ...post,
          author
        };
      });
    })
    .then(posts => {
      return Promise.all(posts)
    })
    // return all data 
    .then(posts => {
      return {
        posts,
        loaded: true
      };
    })
    .catch(err => {
      return err.response;
    });
};

// search for post authors (returns post name and avatar)
const getAuthorById = async authorId => {
  let token = localStorage.getItem("token");
  const getAuthorId = await axios.get(`${url}/user/${authorId}`, {
    headers: { authorization: token }
  });
  return {
    name: getAuthorId.data.firstName + " " + getAuthorId.data.lastName,
    avatar: getAuthorId.data.avatar
  };
};

// get scpecific post
const getPost = config => {
  let token = localStorage.getItem("token");
  return axios
    .get(`${url}/post/${config.id}`, {
      headers: { authorization: token }
    })
    // find author of post
    .then(async response => {
      const author = await getAuthorById(response.data.authorId)
      response.data.author = author;
      return { post: response.data, loaded: true };
    })
    .catch(err => {
      return err.response;
    });
};

// get specific user profile
const getUserProfile = config => {
  let token = localStorage.getItem("token");
  return axios.get(`${url}/user/${config.id}`, {
    headers: { authorization: token }
  }).then(response => {
    return { profile: response.data, loaded: true}
  }).catch(err => {
    return err.response;
  });
};


// get all post of Users
const getPostsOfUser = data => {
  let token = localStorage.getItem("token");
  return axios
    .get(`${url}/user/${data.inputData.id}/posts`, {
      headers: { authorization: token },
      params: data.inputData.params
    })
    // find author of post
    //TODO refactor
    .then(async response => {
      const author = await getAuthorById(data.inputData.id);
      return response.data.map(post => {
        return {
          ...post,
          author
        };
      });
    })
    // send data of posts
    .then(posts => {
      return {
        posts,
        loaded: true
      };
    })
    .catch(err => {
      return err.response;
    });
};

export { getPosts, getPost, getUserProfile, getPostsOfUser };
