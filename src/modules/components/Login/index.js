/*
  Main login form
*/
import React from "react";
import { Link } from "react-router-dom";
import request from "../../../services/api/axios/index";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: null
    };
  }
  // Writing data to the state and updating it when entering email and password in the input fields
  updateForm = event => {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState({
      ...newState
    });
  };

  // Sending email and password to the server
  submitUser = event => {
    event.preventDefault();
    request
      .login({
        inputData: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(res => {
        if (res.error) {
          return this.setState({ error: res.error });
        }
        this.props.handleLogin(true);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log("err", error);
      });
  };

  // Error message appears when entering incorrect data
  messsageError = () => {
    if (this.state.error) {
      return "Incorrect email or password";
    }
  };

  // render data entry form for login
  render() {
    return (
      <form onSubmit={this.submitUser}>
        <h1>Login</h1>
        <label htmlFor="email">
          <input
            id="email"
            value={this.state.email}
            onChange={this.updateForm}
            className={`commonForm__input ${this.state.error ? "error" : ""}`}
            placeholder="e-mail"
            autoComplete="off"
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.updateForm}
            className={`commonForm__input ${this.state.error ? "error" : ""}`}
            placeholder="password"
          />
          <span>{this.messsageError()}</span>
        </label>
        <input type="submit" value="Login" />
        <label>
          <span>Not registered? </span>
          <Link to="/registration">Create an account</Link>
        </label>
      </form>
    );
  }
}
