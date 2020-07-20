import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserProfile from './UserProfile';
import { register } from '../../../redux/actions/auth';
import { getUserById } from '../../../redux/reducers/users';
import { editUserProfile } from '../../../redux/actions/users/edit';

const AddUserDialogHoc = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => getUserById(state.users, state.users.profile));
  const registerProfile = (user) => dispatch(register(user));
  const updateUserHandler = (user) => dispatch(editUserProfile(user));
  
  
  return (
    <UserProfile
      addUserHandler={registerProfile}
      updateUserHandler={updateUserHandler}
      user={profile}
    />
  );
};

export default AddUserDialogHoc;
