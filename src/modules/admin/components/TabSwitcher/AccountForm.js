import React, { useCallback, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAccount } from '../../../redux/actions/users/edit';
import { createID } from '../../../../services/helpers';

const AccountForm = ({ id, title, email, password, onCancel }) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.users.profile);
  
  const [ account, setAccount ] = useState({
    id: createID(),
    title: '',
    email: '',
    password: ''
  });
  
  useEffect(() => {
      if (id) setAccount({
        id,
        title,
        email,
        password
      });
    if(!id) setAccount(acc => ( {
      id: createID(),
      ...acc
    } ));
    }, [ id, title, email, password ]
  );
  
  const handleChange = name => ({ target: { value } }) => {
    setAccount({ ...account, [name]: value });
  };
  
  const [ showPassword, setShowPassword ] = useState(false);
  const handleClickShowPassword = () => setShowPassword( !showPassword);
  
  const visibility = <Icon name='eye' circular link onClick={handleClickShowPassword} />;
  const notVisibility = <Icon name='eye slash' circular link onClick={handleClickShowPassword} />;
  
  const handleCancel = useCallback(() => {
    onCancel();
  }, [ onCancel ]);
  
  const isDisabled = useMemo(() => {
    return account.title === '';
  }, [ account.title ]);
  
  const saveNewPassword = () => {
    dispatch(updateUserAccount(profile, account)).then(result => {
      if (result.success) onCancel();
    });
  };
  
  return (
    <Form className='add-account_card'>
      <Form.Input
        label='Title *'
        value={account.title}
        onChange={handleChange('title')}
      />
      <Form.Input
        label='Username'
        value={account.email}
        onChange={handleChange('email')}
      />
      <Form.Input
        autoComplete='new-password'
        label='Password'
        value={account.password}
        onChange={handleChange('password')}
        type={showPassword ? 'text' : 'password'}
        icon={showPassword ? notVisibility : visibility}
      />
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
          disabled={isDisabled}
        >
          Save
        </Form.Button>
      </Form.Group>
    </Form>
  );
};

AccountForm.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  onCancel: PropTypes.func
};

AccountForm.defaultProps = {
  id: '',
  title: '',
  email: '',
  password: '',
  onCancel: () => {
  }
};

export default AccountForm;
