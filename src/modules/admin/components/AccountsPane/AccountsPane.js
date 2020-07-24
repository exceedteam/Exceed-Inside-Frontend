import React, { useEffect, useState } from 'react';
import { Tab } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import AddItem from '../TabSwitcher/AddItem';
import AccountListHOC from '../AccountList';
import AccountForm from '../TabSwitcher/AccountForm';
import './AccountsPane.scss';

const AccountPane = () => {
  const profile = useSelector(state => state.users.profile);
  const [ isShowSubComponent, setIsShowSubComponent ] = useState(false);
  
  useEffect(() => {
    setIsShowSubComponent(false)
  }, [profile])
  
  const handleShow = (value) => {
    setIsShowSubComponent(value);
  };
  
  return (
    <Tab.Pane vertical attached={false}>
      <AddItem
        title='Add Account'
        isOpen={isShowSubComponent}
        onCancel={() => handleShow(false)}
        onShow={() => handleShow(true)}
      >
        <AccountForm profile={profile} onCancel={() => handleShow(false)} />
      </AddItem>
      <AccountListHOC />
    </Tab.Pane>
  );
};

export default AccountPane;
