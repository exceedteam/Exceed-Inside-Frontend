import React from 'react';
import PropTypes from 'prop-types';
import './Users.scss';
import { useDispatch } from 'react-redux';
import AlertMessage from '../../../common/AlertMessage';
import UserList from '../../components/UserList';
import Search from '../../components/Search';
import UserProfile from '../../components/UserProfile';
import { onChangeSearch } from '../../../redux/actions/users/fetch';
import TabSwitcher from '../../components/TabSwitcher/TabSwitcher';

const Users = ({ users, updateData }) => {
  const dispatch = useDispatch();
  
  const onChangeSearchValue = (value) => {
    dispatch(onChangeSearch(value));
  };
  
  return (
    <div className='Users-List'>
      <div className='user-list__container'>
        <Search setSearchValue={onChangeSearchValue} title='Users' />
        <UserList />
      </div>
      <div className='user-profile'>
        <UserProfile />
      </div>
      <TabSwitcher />
      <AlertMessage type='users' />
    </div>
  );
};

Users.propTypes = {
  // users: PropTypes.array.isRequired,
  updateData: PropTypes.func
};

Users.defaultProps = {
  updateData: () => {
  }
};

export default Users;
