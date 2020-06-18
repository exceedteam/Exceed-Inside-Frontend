import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Users from './Users';
import { getUserById } from '../../../redux/reducers/users';
import { fetchAllUsers as fetchAllUsersAction } from '../../../redux/actions/users/fetch';
import { editUserProfile as editUserProfileAction } from '../../../redux/actions/users/edit';
import CheckboxCell from '../Table/EditableCell/CheckboxCell';

const UsersHOC = ({ users, getUser, fetchAllUsers, editUserProfile }) => {
  
  useEffect(() => {
    fetchAllUsers();
  }, [ fetchAllUsers ]);
  
  const memoizedUsers = useMemo(
    () =>
      users.map(id => getUser(id)),
    [ users, getUser ]
  );
  
  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      // {
      //   Header: 'Password',
      //   accessor: 'password'
      // },
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Team',
        accessor: 'team'
      },
      {
        Header: 'Position',
        accessor: 'position'
      },
      {
        Header: 'Age',
        accessor: 'age'
      },
      {
        Header: 'Role',
        accessor: 'role'
      },
      {
        Header: 'About Info',
        accessor: 'aboutInfo'
      },
      {
        Header: 'Active',
        accessor: 'isActive',
        Cell: CheckboxCell
      },
    ],
    []
  );
  const updateData = (rowIndex, columnId, value, cell) => {
    editUserProfile({
      id: cell.row.values.id,
      [columnId]: value
    });
  };
  
  return (
    <Users users={memoizedUsers} columns={columns} updateData={updateData} />
  );
};

UsersHOC.propTypes = {
  users: PropTypes.array.isRequired,
  fetchAllUsers: PropTypes.func.isRequired,
  editUserProfile: PropTypes.func.isRequired,
  getUser: PropTypes.func
};

UsersHOC.defaultProps = {
  getUser: () => {
  }
};


const mapStateToProps = (state) => {
  const getUser = (id) => getUserById(state.users, id);
  return {
    getUser,
    users: state.users.displayUsers
  };
};

export default connect(mapStateToProps, {
  fetchAllUsers: fetchAllUsersAction,
  editUserProfile: editUserProfileAction
})(UsersHOC);
