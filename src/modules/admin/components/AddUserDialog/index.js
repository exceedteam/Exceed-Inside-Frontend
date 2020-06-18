import React  from 'react';
import { useDispatch } from 'react-redux';
import AddUserDialog from './AddUserDialog';
import { register } from '../../../redux/actions/auth';

const AddUserDialogHoc = () => {
  const dispatch = useDispatch();
  
  const registerProfile = (profile) => dispatch(register(profile));
  
  
  return (
    <AddUserDialog
      addUserHandler={registerProfile}
    />
  );
};

export default AddUserDialogHoc;
