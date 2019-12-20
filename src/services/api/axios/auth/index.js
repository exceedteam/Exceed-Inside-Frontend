import axios from "axios";
const url = process.env.REACT_APP_API_URL;

// Sending email, password, password2 to the server
const register = data => {
  return (
    axios
      .post(`${url}/user`, {
        ...data.inputData
      })
      // Go to login page
      .then(res => {
        if(res) console.log(res)
        return true;
      })
      // If the entered data is not correct display an error message
      .catch(err => {
        const errors = err.response.data;
        return { errors };
      })
  );
};

// Sending email, password to the server, and setting token
const login = data => {
  return axios
    .post(`${url}/login`, { ...data.inputData })
    .then(res => {
      localStorage.setItem("token", res.data.token);
      return {success: true};
    })
    .catch(err => {
      const error = err.response.data;
      return { error };
    });
};

export { register, login };