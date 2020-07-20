import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Image } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import './UserProfile.scss';
import PropTypes from 'prop-types';
import ChangePasswordFields from './ChangePassword';


const options = [
  { key: 'a', text: 'Admin', value: 'admin' },
  { key: 'd', text: 'Developer', value: 'developer' },
  { key: 's', text: 'Sales Manager', value: 'salesManager' },
  { key: 't', text: 'Team Leader', value: 'teamLeader' },
  { key: 'q', text: 'Tester', value: 'tester' }
];

const UserProfile = ({ updateUserHandler, user: initialUser }) => {
  const fileInputRef = useRef();
  const [ user, setUser ] = useState(initialUser);
  const [updatedFields, setUpdatedFields] = useState(new Set(['id']));
  const [ isUser, setIsUser ] = useState(false);
  const [ isEdit, setIsEdit ] = useState(false);
  
  useEffect(() => {
    setUser({
      ...initialUser,
      age: new Date(initialUser.age),
    });
    setIsEdit(false);
    if (initialUser.email) setIsUser(true);
  }, [ initialUser ]);
  
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
  
  
  const handleChangeCheckbox = name => (event, { checked } ) => {
    setUser({ ...user, [name]: checked });
    setUpdatedFields(updatedFields.add(name));
  };
  
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
    isActive
  } = user;
  
  
  const fileChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.onloadend = () => {
      const uri = reader.result;
      
      setUser((oldUser) => ({
        ...oldUser,
        avatar: uri
      }))
      setUpdatedFields(updatedFields.add('avatar'));
    }
    reader.readAsDataURL(file);
  };
  
  const saveUpdatedData = () => {
    const updatedUser = {};
    updatedFields.forEach(field => {
      updatedUser[field] = user[field]
    })
    updateUserHandler(updatedUser);
    setIsEdit(false);
  }
  
  if (isUser) {
    return (
      <div className='user-profile_container'>
        <div className='user-toolbar'>
          {
            isEdit ?
              <Button onClick={saveUpdatedData} color='green'>Save</Button>
              :
              <Button onClick={() => setIsEdit(true)}>Edit</Button>
          }
        </div>
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
              disabled={!isEdit}
            />
            <input
              ref={fileInputRef}
              type='file'
              hidden
              onChange={fileChange}
            />
          </div>
        </div>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input
              label='First name'
              placeholder='First name'
              name='firstName'
              value={firstName}
              onChange={handleChange('firstName')}
              readOnly={!isEdit}
            />
            <Form.Input
              label='Last name'
              placeholder='Last name'
              name='lastName'
              value={lastName}
              onChange={handleChange('lastName')}
              readOnly={!isEdit}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label='Email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={handleChange('email')}
              readOnly={!isEdit}
            />
          </Form.Group>
          <ChangePasswordFields
            disabled={!isEdit}
            userId={user.id}
          />
          
          <Form.Group widths='equal'>
            <SemanticDatepicker
              allowOnlyNumbers
              clearable={isEdit}
              label='Age'
              name='age'
              value={age}
              format='DD.MM.YYYY'
              onChange={handleRoleAndDateChange('age')}
              locale='ru-RU'
              readOnly={!isEdit}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label='Team'
              placeholder='Team'
              name='team'
              value={team}
              onChange={handleChange('team')}
              readOnly={!isEdit}
            />
            <Form.Input
              label='Position'
              placeholder='Position'
              name='position'
              value={position}
              onChange={handleChange('position')}
              readOnly={!isEdit}
            />
          </Form.Group>
          <Form.Select
            label='Role'
            name='role'
            value={role}
            onChange={handleRoleAndDateChange('role')}
            options={options}
            placeholder='Role'
            disabled={!isEdit}
          />
          <Form.TextArea
            name='aboutInfo'
            value={aboutInfo}
            onChange={handleChange('aboutInfo')}
            label='About'
            placeholder='Tell us more about you...'
            readOnly={!isEdit}
          />
          <Form.Group inline>
            <Form.Checkbox
              label='Admin'
              name='admin'
              onClick={handleChangeCheckbox('admin')}
              checked={admin}
              disabled={!isEdit}
            />
            <Form.Checkbox
              label='Active'
              name='isActive'
              onClick={handleChangeCheckbox('isActive')}
              checked={isActive}
              disabled={!isEdit}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
  return <h1>Loading...</h1>;
};

UserProfile.propTypes = {
  user: PropTypes.object,
  addUserHandler: PropTypes.func.isRequired,
  updateUserHandler: PropTypes.func.isRequired
};

UserProfile.defaultProps = {
  user: {
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
  }
};

export default UserProfile;
