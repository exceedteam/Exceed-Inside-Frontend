import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserMainInfoById } from '../../../redux/reducers/users';
import { fetchAllUsers , onSelectProfile } from '../../../redux/actions/users/fetch';

import UserList from './UserList';


const UsersListHOC = ({ users, getUser, fetchAllUsersAction, profile, onSelectProfileAction }) => {
  
  useEffect(() => {
    fetchAllUsersAction();
  }, [ fetchAllUsersAction ]);
  
  const memoizedUsers = useMemo(
    () =>
      users.map(id => getUser(id)),
    [ users, getUser ]
  );
  
  return (
    <UserList list={memoizedUsers} selected={profile} setSelected={onSelectProfileAction} />
  );
};

UsersListHOC.propTypes = {
  users: PropTypes.array.isRequired,
  profile: PropTypes.string.isRequired,
  fetchAllUsersAction: PropTypes.func.isRequired,
  onSelectProfileAction: PropTypes.func.isRequired,
  getUser: PropTypes.func
};

UsersListHOC.defaultProps = {
  getUser: () => {
  }
};


const mapStateToProps = (state) => {
  const getUser = (id) => getUserMainInfoById(state.users, id);
  return {
    getUser,
    users: state.users.displayUsers,
    profile: state.users.profile
  };
};

export default connect(mapStateToProps, {
  fetchAllUsersAction: fetchAllUsers,
  onSelectProfileAction: onSelectProfile,
})(UsersListHOC);
