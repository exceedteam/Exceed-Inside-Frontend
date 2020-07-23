import React, { useMemo } from 'react';
import './AccountList.scss';
import PropTypes from 'prop-types';
import AccountElement from './AccountElement';
import List from '../List';


const AccountList = ({ list}) => {
  
  const memoizedElements = useMemo(() => {
    return list.map(({ id, email,title, password }, ) => (
      <AccountElement
        id={id}
        email={email}
        title={title}
        password={password}
      />
    ));
  }, [ list ]);
  
  return (
    <div className='accounts_container'>
      <List elements={memoizedElements} />
    </div>
  );
};

AccountList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default AccountList;
