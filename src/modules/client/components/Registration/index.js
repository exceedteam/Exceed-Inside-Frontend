import React from "react";
import axios from "axios";
import { createID } from "../../../../services";
import { Link } from "react-router-dom";

const registrationURL = "http://localhost:5000/api/user";

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      errors: {
        email: null,
        password: null,
        password2: null
      }
    };
  }

  // Writing data to the state and updating it when entering email, password and password2 in the input fields
  updateForm = event => {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState({
      ...newState
    });
  };

  // Sending email, password, password2 to the server
  submitUser = event => {
    event.preventDefault();
    axios
      .post(registrationURL, {
        ...this.state
      })
      // Go to login page
      .then(res => {
        this.props.history.push("/login");
      })
      // If the entered data is not correct display an error message
      .catch(err => {
        const errors = err.response.data;
        this.setState({ errors });
      });
  };

  // Error message appears when entering incorrect data
  messsageError() {
    const { errors } = this.state;
    if (errors) {
      const arrOfErr = [];
      for (let key in errors) {
        arrOfErr.push({ err: errors[key] });
      }
      return arrOfErr.map(item => <li key={createID("name")}>{item.err}</li>);
    }
  }

  render() {
    return (
      <form onSubmit={this.submitUser}>
        <h1>Create an account</h1>
        <label htmlFor="email">
          <input id="email" value={this.state.email} onChange={this.updateForm} placeholder="e-mail" autocomplete="off" />
          <span>{this.state.errors.email}</span>
        </label>
        <label htmlFor="password">
          <input id="password" type="password" value={this.state.password} onChange={this.updateForm} placeholder="password" />
          <span>{this.state.errors.password}</span>
        </label>
        <label htmlFor="password2">
          <input id="password2" type="password" value={this.state.password2} onChange={this.updateForm} placeholder="confirm password" />
          <span>{this.state.errors.password2}</span>
        </label>
        <input type="submit" value="SIGN ME UP" />
        <label>
          <span> Already registered? </span>
          <Link to="/login">Login</Link>
        </label>
      </form>
    );
  }
}
