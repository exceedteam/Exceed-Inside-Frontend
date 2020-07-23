import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../../redux/actions/users/fetch';
import { editUserProfile, clearUserProfile } from '../../../redux/actions/users/edit';
import Loader from '../../../common/Loader';
import EditProfile from './editProfile';
import ViewProfile from './viewProfile';
import './profile.scss';
import { Button, Icon } from 'semantic-ui-react';
import { getUserById } from '../../../redux/reducers/users';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		const token = localStorage.getItem('token');
		this.decoded = jwtDecode(token).id;
		this.state = {
			profileData: this.props.profile,
			id: this.props.match.params.id,
			isEdit: false
		};
	}

	getData = (input) => {
		const file = document.querySelector('input[type=file]').files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			const base64Image = reader.result;
			const { profileData } = this.state;
			profileData.avatar = base64Image;
			this.setState({ profileData });
		};
		if (file) {
			reader.readAsDataURL(file);
		} else {
		}
	};

	// search htmlFor a specific user in the DB
	componentDidMount() {
		const { fetchUserProfile, profile } = this.props;
		if (!profile.email)
			fetchUserProfile(this.props.match.params.id).then((profile) => this.setState({ profileData: profile }));
	}

	componentWillUnmount() {
    this.props.clearUserProfile();
  }

	// saving changed user data
	submitEditProfile = () => {
		const { profileData, id } = this.state;
		profileData.id = id;
		this.props
			.editUserProfile(profileData)
			.then((res) => {
				this.setState({ isEdit: false });
				this.props.history.push(`/user/${this.state.id}`);
			})
			.catch((err) => {
				console.log('err', err);
			});
	};

	// updating state if decoded.id === params.id
	updateForm = (event) => {
		const newState = this.state.profileData;
		if (event.target) {
			newState[event.target.id] = event.target.value;
		} else {
			newState.age = event
		}
		
		this.setState({
			profileData: { ...newState }
		});
	};
 
	// render of the profile edit button if the user is the owner of the account
	editProfile() {
		const { id, isEdit } = this.state;
		
		if (this.decoded === id) {
			return (
  <div className='navigation'>
    <Button
      className='button'
      onClick={() => {
							this.setState({ isEdit: !isEdit });
						}}
    >
      {isEdit ? <Icon color='blue' name='reply' /> : <Icon color='blue' name='edit' />}
    </Button>
    {isEdit && (
    <Button className='button' onClick={this.submitEditProfile} disabled={!this.state.isEdit}>
      <Icon color='blue' name='save' />
    </Button>
					)}
  </div>
			);
		}
	}

	// render personal user data
	render() {
		const { id, isEdit, profileData } = this.state;
		const { loading, profile } = this.props;
		return (
  <div className='userProfileContainer'>
    {profile.email && (
    <>
      {this.editProfile()}
      {isEdit ? (
        <EditProfile profileData={profileData} isEdit={isEdit} updateForm={this.updateForm} />
						) : (
  <ViewProfile profileData={profile} isEdit={isEdit} id={id} history={this.props.history} />
						)}
    </>
				)}
    {loading && <Loader />}
  </div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		errors: state.users.errors,
		loading: state.users.loading,
		profile: getUserById(state.users, state.users.currentUser)
	};
};

export default connect(mapStateToProps, { fetchUserProfile, editUserProfile, clearUserProfile })(Profile);
