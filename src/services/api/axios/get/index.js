/*
  All get requests
*/
import axios from "axios";
import { promises } from "dns";
const url = process.env.REACT_APP_API_URL;

// search for post authors (returns post name and avatar)
const getAuthorById = async authorId => {
  const token = localStorage.getItem("token");
  const getAuthorId = await axios.get(`${url}/user/${authorId}`, {
    headers: { authorization: token },
  });
  const { firstName, lastName, avatar } = getAuthorId.data;
  return {
    name: firstName + " " + lastName,
    avatar: avatar
  };
};

// search for all events, posts
const findAll = (config, page) => {
  const token = localStorage.getItem("token");
  return (
    axios
      .get(`${url}/${page}`, {
        headers: { authorization: token },
        params: {
          page: 0,
          perPage: 10
        }
      })
      // find author of post/event
      .then(response => {
        return response.data.map(async data => {
          const author = await getAuthorById(data.authorId);
          return {
            ...data,
            author
          };
        });
      })
      .then(promises => {
        return Promise.all(promises);
      })
      // return all data
      .then(data => {
        return {
          data,
          loaded: true
        };
      })
      .catch(err => {
        return err.response;
      })
  );
};

// search all users and return firstName, lastName and id
const getAllNameOfUsers = users => {
  const token = localStorage.getItem("token");
  return axios
    .get(`${url}/users`, {
      headers: { authorization: token },
      params: {
        page: 0,
        perPage: 10
      }
    })
    .then(response => {
      return response.data.map(item => {
        const { firstName, lastName } = item;
        return { display: firstName + " " + lastName, id: item.id };
      });
      // return response;
    });
};

// search elemets by id
const findItemsByAuthorId = (config, page) => {
  const token = localStorage.getItem("token");
  return (
    axios
      .get(`${url}/user/${config.inputData.id}/${page}`, {
        headers: { authorization: token },
        params: config.inputData.params
      })
      // find author of post/event
      .then(async response => {
        const author = await getAuthorById(config.inputData.id);
        return response.data.map(item => {
          return {
            ...item,
            author
          };
        });
      })
      // send data of posts/events
      .then(data => {
        return {
          data,
          loaded: true
        };
      })
      .catch(err => {
        return err.response;
      })
  );
};

// search element by id
const findById = (config, page) => {
  const token = localStorage.getItem("token");
  return (
    axios
      .get(`${url}/${page}/${config.id}`, {
        headers: { authorization: token }
      })
      // find author of post
      .then(async response => {
        const author = await getAuthorById(response.data.authorId);
        response.data.author = author;
        return { data: response.data, loaded: true };
      })
      .catch(err => {
        console.log("err", err);
        return err.response;
      })
  );
};

// get all of posts
const getPosts = config => {
  return findAll(config, "posts");
};

// get scpecific post
const getPost = data => {
  return findById(data, "post");
};

// get all post of User
const getPostsOfUser = data => {
  return findItemsByAuthorId(data, "posts");
};

// get comments of post
const getComment = post => {
  return findAll(post.data.id, `post/${post.data.id}/comments`);
};

// get specific user profile
const getUserProfile = config => {
  const token = localStorage.getItem("token");
  return axios
    .get(`${url}/user/${config.id}`, {
      headers: { authorization: token }
    })
    .then(response => {
      return { profile: response.data, loaded: true };
    })
    .catch(err => {
      return err.response;
    });
};

// get all events of User
const getEventsOfUser = events => {
  return findItemsByAuthorId(events, "events");
};

// get all of events
const getAllEvents = events => {
  return findAll(events, "events");
};

// get data about a specific event
const getEvent = event => {
  return findById(event, "event");
};

export {
  getAuthorById,
  getPosts,
  getPost,
  getUserProfile,
  getPostsOfUser,
  getAllEvents,
  getEvent,
  getEventsOfUser,
  getComment,
  getAllNameOfUsers
};
