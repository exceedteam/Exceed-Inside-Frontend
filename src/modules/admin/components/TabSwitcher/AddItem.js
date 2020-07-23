import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Transition } from 'semantic-ui-react';

const AddItem = ({ title, isOpen, onCancel, onShow, children }) => {

  return (
    <div className='add_container'>
      <div className='add-tools'>
        <h2>{title}</h2>
        
        { !isOpen && (
          <Icon
            link
            name='plus circle'
            color='green'
            size='big'
            onClick={onShow}
          />
        )}
        {isOpen && (
          <Icon
            link
            name='remove circle'
            color='red'
            size='big'
            onClick={onCancel}
          />
        )}
      </div>
      <Transition.Group
        animation='scale'
        duration='500'
      >
        {isOpen && (
          <div className='add-component'>
            {children}
          </div>
        )}
      </Transition.Group>
    </div>
  );
};

AddItem.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node
  ]).isRequired,
  onCancel: PropTypes.func,
  onShow: PropTypes.func,
};

AddItem.defaultProps = {
  title: '',
  isOpen: false,
  onCancel: () => {},
  onShow: () => {}
};

export default AddItem;
