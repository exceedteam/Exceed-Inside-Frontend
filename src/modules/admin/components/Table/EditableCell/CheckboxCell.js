import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color='default' {...props} />);

const CheckboxCell = ({
                        value: initialValue,
                        row: { index },
                        column: { id },
                        cell,
                        updateMyData // This is a custom function that we supplied to our table instance
                      }) => {
  const [ value, setValue ] = useState(initialValue);
  
  const onChange = useCallback(() => {
    setValue(oldValue => {
      const newValue = !oldValue;
      updateMyData(index, id, newValue, cell);
      return newValue;
    });
  }, [updateMyData, index, id, cell]);
  
  return (
    <GreenCheckbox
      checked={value}
      onChange={onChange}
      name='isActive'
    />
  );
};


CheckboxCell.propTypes = {
  value: PropTypes.bool,
  cell: PropTypes.any.isRequired,
  row: PropTypes.shape({
    index: PropTypes.number.isRequired
  }).isRequired,
  column: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  updateMyData: PropTypes.func.isRequired
};

CheckboxCell.defaultProps = {
  value: false
};

export default CheckboxCell;
