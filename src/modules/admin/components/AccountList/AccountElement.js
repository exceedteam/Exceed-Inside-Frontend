import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import InputCopyToClipboard from '../InputCopyToClipboard';

const AccountElement = ({ id, email, title, password }) => {
  const [ showPassword, setShowPassword ] = useState(false);
  const handleClickShowPassword = () => setShowPassword( !showPassword);
  
  const visibility = <Button icon='eye' basic onClick={handleClickShowPassword} />;
  const notVisibility = <Button icon='eye slash' basic onClick={handleClickShowPassword} />;
  
  return (
    <div className='element'>
      <div className='title'>
        <h3>{title}</h3>
        <Dropdown
          icon='ellipsis vertical'
          floating
          direction='left'
        >
          <Dropdown.Menu>
            <Dropdown.Item>Edit</Dropdown.Item>
            <Dropdown.Item>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='info'>
        <Form>
          <Form.Field>
            <InputCopyToClipboard
              value={email}
            />
          </Form.Field>
          <Form.Field>
            <InputCopyToClipboard
              value={password}
              type={showPassword ? 'text' : 'password'}
            >
              {showPassword ? notVisibility : visibility}
            </InputCopyToClipboard>
          </Form.Field>
        </Form>
      </div>
    </div>
  );
};


AccountElement.propTypes = {
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

AccountElement.defaultProps = {};

export default AccountElement;
