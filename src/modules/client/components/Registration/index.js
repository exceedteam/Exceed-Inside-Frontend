import React from "react";
import { createID } from "../../../../services/helpers";
import { Link } from "react-router-dom";
import request from "../../../../services/api/axios/index";

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        email: "",
        password: "",
        password2: ""
      },
      errors: {
        email: null,
        password: null,
        password2: null
      }
    };
  }

  // Writing data to the state and updating it when entering email, password and password2 in the input fields
  updateForm = event => {
    const newState = this.state.input;
    newState[event.target.id] = event.target.value;
    this.setState({
      input: {...newState}
    });
  };

  // Sending email, password, password2 to the server
  submitUser = event => {
    event.preventDefault();
    request
      .register({
        inputData: this.state.input
      })
      .then(res => {
        if (res.errors) {
          return this.setState({ errors: res.errors})
        }
        this.props.history.push("/login");
      })
      .catch(err => {
        console.log("err", err)
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
      return arrOfErr.map(item => <li key={createID()}>{item.err}</li>);
    }
  }

  // render data entry form for registration
  render() {
    const {email,password, password2} = this.state.input
    return (
      <form onSubmit={this.submitUser}>
        <h1>Create an account</h1>
        <label htmlFor="email">
          <input id="email" value={email} onChange={this.updateForm} placeholder="e-mail" autoComplete="off" />
          <span>{this.state.errors.email}</span>
        </label>
        <label htmlFor="password">
          <input id="password" type="password" value={password} onChange={this.updateForm} placeholder="password" />
          <span>{this.state.errors.password}</span>
        </label>
        <label htmlFor="password2">
          <input id="password2" type="password" value={password2} onChange={this.updateForm} placeholder="confirm password" />
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
