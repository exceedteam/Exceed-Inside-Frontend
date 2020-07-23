import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const AddItem = ({ title, children }) => {
  return (
    <div className='add_container'>
      <div className='add-tools'>
        <h2>{title}</h2>
        <Icon link name='plus circle' color='green' size='big' />
      </div>
      {children}
    </div>
  );
};

AddItem.propTypes = {
   title: PropTypes.string,
   children: PropTypes.oneOfType([
     PropTypes.element,
     PropTypes.node
   ]).isRequired
}

AddItem.defaultProps = {
  title: ''
}

export default AddItem;
