/*
  Component with which the application header is rendered
*/
import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { clearUserProfile } from '../../../redux/actions/users/edit';
import { Button, Dropdown } from 'semantic-ui-react';
import "./header.scss";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySubMenu: false
		};
	}

	handleSubMenu = (flag) => {
		this.setState({
			displaySubMenu: !this.state.displaySubMenu
		});
	};

	// Removing a token from the local storage and switching to the login page
	logout = () => {
		this.props.clearUserProfile();
		this.props.handleLogin(false);
		this.props.history.push('/login');
		localStorage.removeItem('token');
	};

	// getting user id from token
	getId = () => {
		const token = localStorage.getItem('token');
		let decodedToken = jwtDecode(token);
		return decodedToken.id;
	};

	// Render of one of two kinds of header
	render() {
		const { isLogged } = this.props;
		if (isLogged) {
			return (
				<Logged
					history={this.props.history}
					logout={this.logout}
					id={this.getId()}
					displaySubMenu={this.state.displaySubMenu}
					handleSubMenu={this.handleSubMenu}
				/>
			);
		} else {
			return <NotLogged login={this.login} registration={this.registration} history={this.props.history} />;
		}
	}
}

// If the User logged in
const Logged = ({ logout, history, id }) => {
	return (
		<div className="headerLogged">
			<div className="navLogged">
				<Button onClick={() => history.push('/')}>Main page</Button>
				<Button onClick={() => history.push('/create')}>New post</Button>
				<Button onClick={() => history.push('/events')}>Events</Button>
			</div>
			<div className="navLoggedRight">
				<Dropdown text="User" floating labeled button icon="user" className="icon">
					<Dropdown.Menu>
						<Dropdown.Item text="Profile" icon="address card" onClick={() => history.push(`/user/${id}`)} />
						<Dropdown.Item text="Logout" icon="log out" onClick={logout} />
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</div>
	);
};

// If the User not logged
const NotLogged = ({ history }) => {
	return (
		<div className="headerNotLogged">
			<div className="navNotLogged">
				<Button onClick={() => history.push('/login')}>Sign in</Button>
				<Button onClick={() => history.push('/registration')}>Sign up</Button>
			</div>
		</div>
	);
};

export default connect(null, { clearUserProfile })(Header);
