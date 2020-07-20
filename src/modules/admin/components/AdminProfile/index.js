import { connect } from 'react-redux';
import AdminProfile from './AdminProfile';
import { fetchUserProfile } from '../../../redux/actions/users/fetch';
import { getUserById } from '../../../redux/reducers/users';

const mapStateToProps = (state) => {
  return {
    errors: state.users.errors,
    loading: state.users.loading,
    profile: getUserById(state.users, state.users.currentUser)
  };
};

export default connect(mapStateToProps, { fetchUserProfile })(AdminProfile);

