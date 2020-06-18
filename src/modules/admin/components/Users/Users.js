import React from 'react';
import PropTypes from 'prop-types';
import './Users.scss';
import Table from '../Table';
import AlertMessage from '../../../common/AlertMessage';


const Users = ({ users, columns, updateData }) => {
  return (
    <div className='Users'>
      <Table title='Users' data={users} columns={columns} updateData={updateData} />
      <AlertMessage type='users' />
    </div>
 );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  updateData: PropTypes.func,
};

Users.defaultProps = {
  updateData: () => {}
};

export default Users;
