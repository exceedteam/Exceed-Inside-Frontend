import React, { useCallback, useMemo } from 'react';
import './UserList.scss';
import PropTypes from 'prop-types';
import UserElement from './UserElement';
import List from '../List';


const UserList = ({ list, selected, setSelected }) => {
  
  const handleSelect = useCallback((id) => {
    setSelected(id);
  }, [setSelected]);
  
  const memoizedElements = useMemo(() => {
    return list.map(({ id, email, fullName }, index) => (
      <UserElement
        id={id}
        isSelected={(id === selected) || (!selected && !index)}
        onClick={handleSelect}
        email={email}
        name={fullName}
      />
    ));
  }, [ list, selected, handleSelect ]);
  
  return (
    <div className='list_container'>
      <List elements={memoizedElements} />
    </div>
  );
};

UserList.propTypes = {
  list: PropTypes.array.isRequired,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
};
UserList.defaultProps = {
  selected: '',
  setSelected: () => {}
};

export default UserList;
