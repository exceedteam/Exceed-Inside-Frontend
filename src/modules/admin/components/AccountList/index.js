import React from 'react';
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import { getUserAccountsInfoById } from '../../../redux/reducers/users';

import AccountList from './AccountList';

const profileAccounts = createSelector(
  state => state.users,
  users => getUserAccountsInfoById(users, users.profile)
)

const AccountListHOC = () => {
  const accounts = useSelector(profileAccounts)
  if (accounts.length > 0)
    return (
      <AccountList list={accounts} />
    );
  return null;
};

export default AccountListHOC;
