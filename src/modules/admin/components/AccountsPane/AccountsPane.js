import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import AddItem from '../TabSwitcher/AddItem';
import AccountListHOC from '../AccountList';
import AccountForm from '../TabSwitcher/AccountForm';
import './AccountsPane.scss';

const AccountPane = () => {
  const [ isShowSubComponent, setIsShowSubComponent ] = useState(false);
  
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
        <AccountForm onCancel={() => handleShow(false)} />
      </AddItem>
      <AccountListHOC />
    </Tab.Pane>
  );
};

export default AccountPane;
