import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Label, Divider, Transition } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { editPassword } from '../../../redux/actions/auth';
import { CHANGE_PASSWORD_CANCEL } from '../../../redux/actionTypes';

const ChangePasswordFields = ({ disabled, userId }) => {
  const dispatch = useDispatch();
  const errors = useSelector(state => state.auth.changePasswordErrors);
  
  const initialPasswordInfo = useMemo(() => ({
    id: userId,
    oldPassword: '',
    password: '',
    password2: ''
  }), [userId])
  
  const [ passwordInfo, setPasswordInfo ] = useState(initialPasswordInfo);
  
  useEffect(() => {
    setPasswordInfo((pwInfo) => ( { ...pwInfo, id: userId } ));
  }, [ userId ]);
  

  const [ isShowPassword, setIsShowPassword ] = useState(false);
  const handleClickShowPassword = () => setIsShowPassword( !isShowPassword);
  
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
  
  const handleCancel = useCallback(() => {
    dispatch({ type: CHANGE_PASSWORD_CANCEL});
    setPasswordInfo(initialPasswordInfo);
    setIsChange(false);
    setIsShowPassword(false);
  },[dispatch, initialPasswordInfo])
  
  useEffect(() => {
    if (disabled) handleCancel()
  }, [disabled, handleCancel])
  
  const saveNewPassword =useCallback( () => {
    dispatch(editPassword(passwordInfo)).then(response => {
      if (response === 'success') {
        setPasswordInfo(initialPasswordInfo);
        setIsChange(false);
        setIsShowPassword(false);
      }
    })
  }, [dispatch, passwordInfo, initialPasswordInfo]);
  
  return (
    <Form.Group widths='equal' grouped>
      <Transition.Group
        animation='scale'
        duration='500'
      >
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
      </Transition.Group>
      <Transition.Group
        animation='scale'
        duration='500'
      >
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
                type={isShowPassword ? 'text' : 'password'}
                icon={isShowPassword ? notVisibility : visibility}
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
                name='password'
                value={password2}
                onChange={handleChange('password2')}
                type={isShowPassword ? 'text' : 'password'}
                icon={isShowPassword ? notVisibility : visibility}
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
                  color='red'
                  onClick={handleCancel}
                >
                  Cancel
                </Form.Button>
                <Form.Button
                  compact
                  color='green'
                  onClick={saveNewPassword}
                >
                  Save
                </Form.Button>
              </Form.Group>
            </Form.Group>
          )
        }
      </Transition.Group>
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
