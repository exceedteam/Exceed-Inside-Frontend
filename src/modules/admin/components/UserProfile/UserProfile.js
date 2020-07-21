import React, { useCallback, useRef, useState } from 'react';
import { Form, Button, Image, Icon, Label } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import PropTypes from 'prop-types';
import ChangePasswordFields from './ChangePassword';


const options = [
  { key: 'a', text: 'Admin', value: 'admin' },
  { key: 'd', text: 'Developer', value: 'developer' },
  { key: 'j', text: 'Junior', value: 'junior' },
  { key: 's', text: 'Sales Manager', value: 'salesManager' },
  { key: 't', text: 'Team Leader', value: 'teamLeader' },
  { key: 'q', text: 'Tester', value: 'tester' }
];

const UserProfile = ({
                       user, isDisabled, handleRoleAndDateChange,
                       handleChangeCheckbox, handleChange, handleAvatarChange,
                       errors
                     }) => {
  const fileInputRef = useRef();
  const [ showPassword, setShowPassword ] = useState(false);
  const handleClickShowPassword = () => setShowPassword( !showPassword);
  
  const visibility = <Icon name='eye' circular link onClick={handleClickShowPassword} />;
  const notVisibility = <Icon name='eye slash' circular link onClick={handleClickShowPassword} />;
  
  
  const {
    avatar,
    firstName,
    lastName,
    email,
    age,
    team,
    role,
    position,
    admin,
    aboutInfo,
    isActive,
    password,
    password2
  } = user;
  
  const renderError = useCallback((name) => {
    return (
      <>
        {
          !!errors[name] && (
            <Label basic color='red' pointing>
              {errors[name]}
            </Label>
          )
        }
      </>
    );
  }, [ errors ]);
  
  return (
    <div className='user-profile-form'>
      <div className='user-image_container'>
        <div>
          <Image size='small' rounded src={avatar} className='avatar' />
        </div>
        <div>
          <Button
            label={{
              basic: true,
              content: 'Select file'
            }}
            icon='upload'
            onClick={() => fileInputRef.current.click()}
            disabled={!isDisabled}
          />
          <input
            ref={fileInputRef}
            type='file'
            hidden
            onChange={handleAvatarChange}
          />
        </div>
      </div>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field>
            <Form.Input
              label='First name'
              placeholder='First name'
              name='firstName'
              value={firstName}
              onChange={handleChange('firstName')}
              readOnly={!isDisabled}
            />
            {renderError('firstName')}
          </Form.Field>
          <Form.Field>
            <Form.Input
              label='Last name'
              placeholder='Last name'
              name='lastName'
              value={lastName}
              onChange={handleChange('lastName')}
              readOnly={!isDisabled}
            />
            {renderError('lastName')}
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field>
            <Form.Input
              label='Email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={handleChange('email')}
              readOnly={!isDisabled}
            />
            {renderError('email')}
          </Form.Field>
        </Form.Group>
        {
          user.id && (
            <ChangePasswordFields
              disabled={!user.id || !isDisabled}
              userId={user.id}
            />
          )
        }
        {
          !user.id && (
            <>
              <Form.Group widths='equal'>
                <Form.Field>
                  <Form.Input
                    autoComplete='new-password'
                    label='Password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={handleChange('password')}
                    type={showPassword ? 'text' : 'password'}
                    icon={showPassword ? notVisibility : visibility}
                  />
                  {renderError('password')}
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
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
                  {renderError('password2')}
                </Form.Field>
              </Form.Group>
            </>
          )
        }
        
        <Form.Group widths='equal'>
          <SemanticDatepicker
            allowOnlyNumbers
            clearable={isDisabled}
            label='Age'
            name='age'
            value={age}
            format='DD.MM.YYYY'
            onChange={handleRoleAndDateChange('age')}
            locale='ru-RU'
            readOnly={!isDisabled}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            label='Team'
            placeholder='Team'
            name='team'
            value={team}
            onChange={handleChange('team')}
            readOnly={!isDisabled}
          />
          <Form.Input
            label='Position'
            placeholder='Position'
            name='position'
            value={position}
            onChange={handleChange('position')}
            readOnly={!isDisabled}
          />
        </Form.Group>
        <Form.Select
          label='Role'
          name='role'
          value={role}
          onChange={handleRoleAndDateChange('role')}
          options={options}
          placeholder='Role'
          disabled={!isDisabled}
        />
        <Form.TextArea
          name='aboutInfo'
          value={aboutInfo}
          onChange={handleChange('aboutInfo')}
          label='About'
          placeholder='Tell us more about you...'
          readOnly={!isDisabled}
        />
        <Form.Group inline>
          <Form.Checkbox
            label='Admin'
            name='admin'
            onClick={handleChangeCheckbox('admin')}
            checked={admin}
            disabled={!isDisabled}
          />
          <Form.Checkbox
            label='Active'
            name='isActive'
            onClick={handleChangeCheckbox('isActive')}
            checked={isActive}
            disabled={!isDisabled}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object,
  isDisabled: PropTypes.bool,
  handleRoleAndDateChange: PropTypes.func.isRequired,
  handleChangeCheckbox: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAvatarChange: PropTypes.func.isRequired,
};

UserProfile.defaultProps = {
  errors: {},
  isDisabled: false,
};

export default UserProfile;
