/*
  Main login form
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions/auth';
import './login.scss';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};
	}

	// Writing data to the state and updating it when entering email and password in the input fields
	updateForm = (event) => {
		const newState = {};
		newState[event.target.id] = event.target.value;
		this.setState({
			...newState
		});
	};

	// Sending email and password to the server
	submitUser = (event) => {
		event.preventDefault();
		this.props
			.login({
				email: this.state.email,
				password: this.state.password
			})
			.then((res) => {
				if (res.success) {
					this.props.handleLogin(true);
					this.props.history.push('/');
				}
			})
			.catch((err) => {
				console.log('error', err);
			});
	};

	// Error message appears when entering incorrect data
	messageError = () => {
		if (this.props.error) {
			return 'Incorrect email or password';
		}
	};

	// render data entry form for login
	render() {
		return (
			<div className="container">
				<form onSubmit={this.submitUser} className="form">
					<h1 className="title">Login</h1>
					<label htmlFor="email">
						<input
							id="email"
							value={this.state.email}
							onChange={this.updateForm}
							className={`input ${this.props.error ? 'error' : ''}`}
							placeholder="E-mail"
						/>
					</label>
					<label htmlFor="password">
						<input
							id="password"
							type="password"
							value={this.state.password}
							onChange={this.updateForm}
							className={`input ${this.props.error ? 'error' : ''}`}
							placeholder="Password"
						/>
						<span className="errorMessage">{this.messageError()}</span>
					</label>
					<input className="btn" type="submit" value={this.props.loading ? 'Loading...' : 'Sign in'} />
					<label>
						<span>Not registered? </span>
						<Link to="/registration"  className="link">Create an account</Link>
					</label>
				</form>
			</div>
		);
	}
}

//connection with redux
const mapStateToProps = (state) => {
	return {
		error: state.auth.errorLogin,
		loading: state.auth.loading
	};
};

export default connect(mapStateToProps, { login })(Login);
