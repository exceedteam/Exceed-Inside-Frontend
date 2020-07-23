import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import UserProfile from './UserProfile';
import { register } from '../../../redux/actions/auth';
import { getUserById } from '../../../redux/reducers/users';
import { editUserProfile } from '../../../redux/actions/users/edit';
import './UserProfile.scss';
import { EDIT_USER_PROFILE_CANCEL, REGISTER_CANCEL } from '../../../redux/actionTypes';
import Loader from '../../../common/Loader';

const initialUser = {
  avatar: 'http://res.cloudinary.com/dx6ps2mwc/image/upload/v1594888577/avatars/5f10111504b47b52101eb6b3.png',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  password2: '',
  age: null,
  team: '',
  role: '',
  position: '',
  admin: false,
  aboutInfo: '',
  isActive: false
};

const AddUserDialogHoc = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => getUserById(state.users, state.users.profile));
  const errorsRegistration = useSelector(state => state.auth.errorsRegistration);
  const errorsUpdating = useSelector(state => state.users.error);
  
  const updateUserHandler = (user) => dispatch(editUserProfile(user));
  
  const [ user, setUser ] = useState(profile);
  const [ isNewUser, setIsNewUser ] = useState(false);
  const [ updatedFields, setUpdatedFields ] = useState(new Set([ 'id' ]));
  const [ isUser, setIsUser ] = useState(false);
  const [ isEdit, setIsEdit ] = useState(false);
  
  useEffect(() => {
    if (profile.email) {
      setIsUser(true);
      setUser({
        ...profile,
        age: profile.age === null ? null : new Date(profile.age)
      });
    }
  }, [ profile ]);
  
  const handleRoleAndDateChange = name => (event, { value }) => {
    try {
      setUser({ ...user, [name]: value });
    } catch (e) {
      setUser({ ...user, [name]: null });
    }
    setUpdatedFields(updatedFields.add(name));
  };
  
  const handleChange = name => ({ target: { value } }) => {
    setUser({ ...user, [name]: value });
    setUpdatedFields(updatedFields.add(name));
  };
  
  const handleChangeCheckbox = name => (event, { checked }) => {
    setUser({ ...user, [name]: checked });
    setUpdatedFields(updatedFields.add(name));
  };
  
  const handleAvatarChange = (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const uri = reader.result;
        
        setUser((oldUser) => ( {
          ...oldUser,
          avatar: uri
        } ));
      };
      if (file && file.type.match('image.*')) {
        reader.readAsDataURL(file);
        setUpdatedFields(updatedFields.add('avatar'));
      }
    } catch (e) {
      console.log('Error image upload', e);
    }
  };
  
  const saveUpdatedData = () => {
    const updatedUser = {};
    updatedFields.forEach(field => {
      updatedUser[field] = user[field];
    });
    if ( !Object.keys(errorsUpdating))
      setIsEdit(false);
    updateUserHandler(updatedUser).then(({ success }) => {
      if (success) setIsEdit(false);
    });
  };
  
  const registerProfile = () => {
    dispatch(register(user)).then(({ success }) => {
      if (success) {
        setIsNewUser(false);
        setIsEdit(false);
      }
    });
  };
  
  const handleCancel = () => {
    setUser({
      ...profile,
      age: profile.age === null ? null : new Date(profile.age)
    });
    setIsEdit(false);
    setIsNewUser(false);
    dispatch({ type: isNewUser ? REGISTER_CANCEL : EDIT_USER_PROFILE_CANCEL });
  };
  
  const handleIsNewUser = (value) => () => {
    setIsEdit(value);
    setIsNewUser(value);
    if (value) setUser(initialUser);
  };
  
  return (
    <div className='user-profile_container'>
      <div className='user-toolbar'>
        
        {isNewUser && <Button circular icon='angle left' onClick={handleCancel} />}
        { !isNewUser && (
          <Button icon labelPosition='right' onClick={handleIsNewUser(true)}>
            Add User
            <Icon name='add user' />
          </Button>
        )}
        <div className='edit-menu'>
          {
            isEdit && (
              <>
                <Button onClick={handleCancel} color='red'>Cancel</Button>
                <Button
                  onClick={isNewUser ? registerProfile : saveUpdatedData}
                  disabled={updatedFields.size === 1}
                  color='green'
                >
                  Save
                </Button>
              </>
            )
          }
          {
            !isEdit && <Button onClick={() => setIsEdit(true)}>Edit</Button>
          }
        </div>
      </div>
      {isUser ? (
        <UserProfile
          errors={isNewUser ? errorsRegistration : errorsUpdating}
          handleRoleAndDateChange={handleRoleAndDateChange}
          handleChangeCheckbox={handleChangeCheckbox}
          handleChange={handleChange}
          handleAvatarChange={handleAvatarChange}
          isDisabled={isEdit}
          user={user}
        />
      ) : <Loader />}
    </div>
  );
};

export default AddUserDialogHoc;
