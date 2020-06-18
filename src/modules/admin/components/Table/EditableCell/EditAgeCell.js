import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ( {
  paper: {
    border: '1px solid #e0e0e0',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
    boxShadow: '0 10px 40px -14px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: '0 10px'
  }
} ));
const EditAgeCell = ({ value, onSave, onChange, onCancel }) => {
  const classes = useStyles();
  
  return (
    <div className={classes.paper}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant='inline'
          format='dd/MM/yyyy'
          margin='normal'
          id='date-picker-inline'
          value={value}
          onChange={onChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
      </MuiPickersUtilsProvider>
      <Button className={classes.button} onClick={onSave}>Save</Button>
      <Button className={classes.button} onClick={onCancel}>Cancel</Button>
    </div>
  );
};

EditAgeCell.propTypes = {
  value: PropTypes.string,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
  onCancel: PropTypes.func
};

EditAgeCell.defaultProps = {
  value: '',
  onSave: () => {},
  onChange: () => {},
  onCancel: () => {}
}

export default EditAgeCell
