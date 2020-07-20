import React from 'react';
import './List.scss'
import PropTypes from 'prop-types';
import { createID } from '../../../../services/helpers';

const List = ({ elements }) => {
  
  return (
    <div className='list'>
      <ul>
        {
          elements.map(el => <li key={createID()}>{el}</li>)
        }
      </ul>
    </div>
  );
};

List.propTypes = {
  elements: PropTypes.array.isRequired,
};

export default List;
