import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PostElement = ({ id, name, email, isSelected, onClick }) => {
  
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

PostElement.propTypes = {
  isSelected: PropTypes.bool,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
PostElement.defaultProps = {
  isSelected: false,
  onClick: () => {},
}
export default PostElement;
