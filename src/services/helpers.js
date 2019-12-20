// generating idi for children in lists
export const createID = (payload = '') => {
  return payload + ' ' + Math.random().toString(36).substr(2, 9);
}

// check for token in local storage
export const getIslogin = () => {
  let isLogined = false;
  let token = localStorage.getItem('token');
  if (token) isLogined = true;
  return isLogined
}

// converts the date to a more pleasant look
export const prettyDate = item => {
  let isDate = item.replace(/[T]|[0-9Z.:]{8}$/gi, " ");
  return isDate;
};