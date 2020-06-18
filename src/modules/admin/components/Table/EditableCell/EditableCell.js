import React, { useCallback } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Popper from '../../Popper';
import getEditCellByType from './getEditCellByType';

const inputStyle = {
  padding: 5,
  margin: 0,
  border: 0,
  background: 'transparent',
  cursor: 'pointer'
};


// Create an editable cell renderer
const EditableCell = ({
                        value: initialValue,
                        row: { index },
                        column: { id },
                        cell,
                        updateMyData // This is a custom function that we supplied to our table instance
                      }) => {
  // We need to keep and update the state of the cell normally
  const [ value, setValue ] = React.useState(initialValue);
  
  
  const onChange = e => {
    setValue(id === 'age' ? e : e.target.value);
  };
  
  // We'll only update the external data when the input is blurred
  const handleSave = useCallback(() => {
    updateMyData(index, id, value, cell);
  }, [ updateMyData, index, id, value, cell ]);
  
  
  const handleCancel = () => {
    setValue(initialValue);
  };
  
  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    
    setValue(initialValue);
  }, [ initialValue ]);
  
  let displayValue = id !== 'age' ? value : moment(value).format('LL');
  if ( !value) displayValue = '';
  
  const renderPopperComponent = useCallback((props) => {
    return getEditCellByType(id)(props)
  }, [id])
  
  const getType = useCallback(() => {
    switch (id) {
      case 'password': return id
      case 'isActive': return 'checkbox'
      default : return 'text'
    }
  }, [id])
    return (
      <Popper
        onChange={onChange}
        onCancel={handleCancel}
        value={value}
        onSave={handleSave}
        renderPopperComponent={renderPopperComponent}
      >
        <input
          style={inputStyle}
          value={displayValue}
          disabled
          type={getType()}
        />
      </Popper>
  );
};

EditableCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  cell: PropTypes.any.isRequired,
  row: PropTypes.shape({
    index: PropTypes.number.isRequired
  }).isRequired,
  column: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  updateMyData: PropTypes.func.isRequired
};

EditableCell.defaultProps = {
  value: ''
};

export default EditableCell;


