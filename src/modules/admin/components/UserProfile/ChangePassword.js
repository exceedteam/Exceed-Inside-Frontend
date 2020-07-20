import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Label, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { editPassword } from '../../../redux/actions/auth';
import { CHANGE_PASSWORD_CANCEL } from '../../../redux/actionTypes';

const ChangePasswordFields = ({ disabled, userId }) => {
  const dispatch = useDispatch();
  const errors = useSelector(state => state.auth.changePasswordErrors);
  
  const [ passwordInfo, setPasswordInfo ] = useState({
    oldPassword: '',
    password: '',
    password2: ''
  });
  
  useEffect(() => {
    setPasswordInfo((pwInfo) => ( { ...pwInfo, id: userId } ));
  }, [ userId ]);
  
  const saveNewPassword = () => {
    dispatch(editPassword(passwordInfo));
  };
  
  const [ showPassword, setShowPassword ] = useState(false);
  const handleClickShowPassword = () => setShowPassword( !showPassword);
  
  const visibility = <Icon name='eye' circular link onClick={handleClickShowPassword} />;
  const notVisibility = <Icon name='eye slash' circular link onClick={handleClickShowPassword} />;
  
  const handleChange = name => ({ target: { value } }) => {
    setPasswordInfo({ ...passwordInfo, [name]: value });
  };
  
  const [ isChange, setIsChange ] = useState(false);
  
  const {
    oldPassword,
    password,
    password2
  } = passwordInfo;
  
  const handleCancel = () => {
    dispatch({ type: CHANGE_PASSWORD_CANCEL});
    setIsChange(false)
  }
  
  return (
    <Form.Group widths='equal' grouped>
      
      {
        !isChange && (
          <Form.Button
            compact
            disabled={disabled}
            onClick={() => setIsChange( !isChange)}
          >
            Change Password
          </Form.Button>
        )
      }
      {
        isChange && (
          <Form.Group widths='equal' grouped>
            <Divider />
            <Form.Input
              autoComplete='new-password'
              label='Old Password'
              placeholder='Old Password'
              name='oldPassword'
              value={oldPassword}
              onChange={handleChange('oldPassword')}
              type='password'
            />
            { !!errors.oldPassword && (
              <Label basic color='red' pointing>
                {errors.oldPassword}
              </Label>
            )}
            <Form.Input
              autoComplete='new-password'
              label='New Password'
              placeholder='New Password'
              name='password'
              value={password}
              onChange={handleChange('password')}
              type={showPassword ? 'text' : 'password'}
              icon={showPassword ? notVisibility : visibility}
            />
            { !!errors.password && (
              <Label basic color='red' pointing>
                {errors.password}
              </Label>
            )}
            <Form.Input
              autoComplete='new-password'
              label='Repeat password'
              placeholder='Repeat password'
              name='password2'
              value={password2}
              onChange={handleChange('password2')}
              type={showPassword ? 'text' : 'password'}
              icon={showPassword ? notVisibility : visibility}
            />
            { !!errors.password2 && (
              <Label basic color='red' pointing>
                {errors.password2}
              </Label>
            )}
            <Divider />
            <Form.Group inline widths='1'>
              <Form.Button
                compact
                color='green'
                onClick={saveNewPassword}
              >
                Save
              </Form.Button>
              <Form.Button
                compact
                color='red'
                onClick={handleCancel}
              >
                Cancel
              </Form.Button>
            </Form.Group>
          </Form.Group>
        )
      }
    </Form.Group>
  );
};

ChangePasswordFields.propTypes = {
  disabled: PropTypes.bool,
  userId: PropTypes.string.isRequired,
};
ChangePasswordFields.defaultProps = {
  disabled: false
};

export default ChangePasswordFields;
