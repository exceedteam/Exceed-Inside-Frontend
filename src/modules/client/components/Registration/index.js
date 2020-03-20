import React from "react";
import { createID } from "../../../../services/helpers";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../../redux/actions/auth";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: ""
    };
  }
  
  // Writing data to the state and updating it when entering email, password and password2 in the input fields
  updateForm = event => {
    const newInput = this.state;
    newInput[event.target.id] = event.target.value;
    this.setState({
      input: { ...newInput },
    });
  };
  
  // Sending email, password, password2 to the server
  submitUser = event => {
    event.preventDefault();
    
    this.props.register(this.state).then(res => {
      if (res.success) {
        this.props.history.push("/login");
      }
    }).catch(err => {
      console.log('error', err);
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
    const { email, password, password2 } = this.state;
    const { errors } = this.props
    return (
      <div className="container">
        <form
          onSubmit={this.submitUser}
          className="form"
        >
          <h1 className="title">Create an account</h1>
          <label htmlFor="email">
            <input
              id="email"
              value={email}
              onChange={this.updateForm}
              placeholder="E-mail"
              className={`input ${errors.email ? "error" : ""}`}
            />
            <span className="errorMessage">{errors.email}</span>
          </label>
          <label htmlFor="password">
            <input
              id="password"
              type="password"
              value={password}
              onChange={this.updateForm}
              placeholder="Password"
              className={`input ${errors.password ? "error" : ""}`}
            />
            <span className="errorMessage">{errors.password}</span>
          </label>
          <label htmlFor="password2">
            <input
              id="password2"
              type="password"
              value={password2}
              onChange={this.updateForm}
              placeholder="Confirm password"
              className={`input ${errors.password2 ? "error" : ""}`}
            />
          </label>
          <input className="btn" type="submit" value="Sign up"/>
          <label>
            <span> Already registered? </span>
            <Link to="/login" className="link">Login</Link>
          </label>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    errors: state.auth.errorsRegistration,
    loading: state.auth.loading,
  };
};

export default connect(
  mapStateToProps,
  { register }
)(Registration);
