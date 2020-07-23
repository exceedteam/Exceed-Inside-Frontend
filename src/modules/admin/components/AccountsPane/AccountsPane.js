import React from 'react';
import { Tab } from 'semantic-ui-react';
import AddItem from '../TabSwitcher/AddItem';
import AccountListHOC from '../AccountList';

const AccountPane = () => {
  return (
    <Tab.Pane vertical attached={false}>
      <AddItem
        title='Add Account'
      />
      <AccountListHOC />
    </Tab.Pane>
  );
};

export default AccountPane
