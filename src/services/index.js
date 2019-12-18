export const createID = (payload = '') => {
  return payload + ' ' + Math.random().toString(36).substr(2, 9);
}

export const getIslogin = () => {
  let isLogined = false;
  let token = localStorage.getItem('token');
  if (token) isLogined = true;
  return isLogined
}