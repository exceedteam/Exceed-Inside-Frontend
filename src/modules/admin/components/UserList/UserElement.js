import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const UserElement = ({ id, name, email, isSelected, onClick }) => {
  
  const handleSelect = () => {
    onClick(id)
  }
  
  const element = classNames({
    'element': true,
    'active': isSelected,
  });
  
  return (
    <div className={element} onClick={handleSelect}>
      <span>{name}</span>
      <span>{email}</span>
    </div>
  );
};

UserElement.propTypes = {
  isSelected: PropTypes.bool,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
UserElement.defaultProps = {
  isSelected: false,
  onClick: () => {},
}
export default UserElement;
