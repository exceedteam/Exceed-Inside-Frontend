import React, { forwardRef, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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

const EditDefaultCell = forwardRef(({ value, onSave, onChange, onCancel, multiline }, ref) => {
  const inputRef = useRef(null);
  
  const classes = useStyles();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  return (
    <div className={classes.paper} ref={ref}>
      <TextField type='text' value={value} onChange={onChange} multiline={!!multiline} rows={multiline} inputRef={inputRef} />
      <Button className={classes.button} onClick={onSave}>Save</Button>
      <Button className={classes.button} onClick={onCancel}>Cancel</Button>
    </div>
  );
});

EditDefaultCell.propTypes = {
  value: PropTypes.string,
  multiline: PropTypes.number,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
  onCancel: PropTypes.func
};

EditDefaultCell.defaultProps = {
  value: '',
  multiline: 0,
  onSave: () => {},
  onChange: () => {},
  onCancel: () => {}
}


export default EditDefaultCell;
