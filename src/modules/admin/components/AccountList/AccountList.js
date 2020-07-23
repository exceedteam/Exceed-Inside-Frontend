import React, { useCallback, useMemo, useState } from 'react';
import './AccountList.scss';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AccountElement from './AccountElement';
import List from '../List';
import AccountForm from '../TabSwitcher/AccountForm';
import { updateUserAccount } from '../../../redux/actions/users/edit';


const AccountList = ({ list }) => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.users.profile);
    const handleDelete = useCallback((id) => {
      dispatch(updateUserAccount(profile, { id, remove: true }));
    }, [ dispatch, profile ]);
    
    const [ editedAccount, setEditedAccount ] = useState('');
    
    const handleEdit = (id) => {
      setEditedAccount(id);
    };
    const handleCancel = () => {
      setEditedAccount('');
    };
    
    
    const memoizedElements = useMemo(() => {
      return list.map(({ id, email, title, password }) => {
        if (editedAccount === id) return (
          <AccountForm
            onCancel={handleCancel}
            id={id}
            title={title}
            email={email}
            password={password}
          />
        );
        
        return (
          <AccountElement
            id={id}
            email={email}
            title={title}
            password={password}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        );
      });
    }, [ list, editedAccount, handleDelete ]);
    
    return (
      <div className='accounts_container'>
        <List elements={memoizedElements} />
      </div>
    );
  }
;

AccountList.propTypes = {
  list: PropTypes.array.isRequired
};

export default AccountList;
