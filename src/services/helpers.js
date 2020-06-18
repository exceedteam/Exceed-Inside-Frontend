import moment from 'moment';
import jwtDecode from 'jwt-decode';

export const getCurrentUserId = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  return decodedToken.id;
};

// generating idi for children in lists
export const createID = (payload = '') => {
  return `${payload} ${Math.random().toString(36).substr(2, 9)}`;
};

// check for token in local storage
export const getIsLogin = () => {
  let isLogged = false;
  const token = localStorage.getItem('token');
  if (token) isLogged = true;
  return isLogged;
};

// image display function in the text
export const replaceImg = ({ type, text, images }) => {
  switch (type) {
    // replaces the id of the image with a link in the text
    case 'img':
      images.forEach((image) => {
        const imageBase64 = `![](${image.src})`;
        const imageId = `<id:${image.id}>`;
        const fromIdtoImage = new RegExp(imageId);
        text = text.replace(fromIdtoImage, imageBase64);
      });
      return text;
    // replaces the base 64 of the image with a id in the text
    case 'id':
      const fromImagetoId = /!\[\]\(.+?\)/;
      images.forEach((image) => {
        const imageId = `<id:${image.id}>`;
        text = text.replace(fromImagetoId, imageId);
      });
      return text;
    default:
      return text;
  }
};

// display of different time formats for different time periods
export const typeOfTime = (date) => {
  const currentTime = moment();
  const createdTime = moment(date);
  if (currentTime.diff(createdTime, 'days') <= 1) {
    return moment(date).startOf('minute').fromNow();
  }
  return moment(date).format('LLL');
};

// check for admin role
export const getIsAdmin = () => {
  let isAdmin = false;
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  if (decodedToken.admin) isAdmin = true;
  return isAdmin;
};

// display comments by id
export const togglePropertyInSet = (set, property) => {
  if (set.has(property)) {
    set.delete(property);
  } else {
    set.add(property);
  }
  return set;
};

// delete the id of the mentioned user
export const replaceId = (text) => {
  const re = /@\[(.+?)\]\(\w+?\)/g;
  // const newText = text.replace(re, "@$1")
  const newText = text.replace(re, `<Popup content='${text}' trigger=<span>@$1</span> />`);
  return newText;
};

// verification of authorship
export const isAuthor = (itemId) => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token).id;
  if (itemId === decodedToken) {
    return true;
  }
  return false;
};

// removing a token from the localStorage and routing to the login page when token is invalid
export const isInvalidToken = (err) => {
  if (err.response ? err.response.data.Error === 'Token error' : false) {
    localStorage.removeItem('token');
    document.location.reload(true);
  }
};

// combine two arrays without duplicates
export const union =(arrA, arrB) => {
  const setA  = new Set(arrA)
  const setB  = new Set(arrB)
  // eslint-disable-next-line no-underscore-dangle
  const _union = new Set(setA)
  // eslint-disable-next-line no-restricted-syntax
  for (const elem of setB) {
    _union.add(elem)
  }
  return Array.from(_union).filter(Boolean)
}
