import React, { useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
// import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import DateFnsUtils from '@date-io/date-fns';


import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color='default' {...props} />);

const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  password2: '',
  age: new Date().valueOf(),
  team: '',
  role: '',
  position: '',
  admin: false,
  aboutInfo: '',
  isActive: false,
};

const useStyles = makeStyles({
  root: {
    borderRadius: '20px'
  }
});

const AddUserDialog = props => {
  
  const classes = useStyles();
  
  const [ user, setUser ] = useState(initialUser);
  const [ open, setOpen ] = useState(false);
  const { addUserHandler, Icon } = props;
  
  const [ showPassword, setShowPassword ] = useState(false);
  const handleClickShowPassword = () => setShowPassword( !showPassword);
  const handleMouseDownPassword = () => setShowPassword( !showPassword);
  
  const [ switchState, setSwitchState ] = useState({
    addMultiple: false
  });
  
  // const handleSwitchChange = name => event => {
  //   setSwitchState({ ...switchState, [name]: event.target.checked });
  // };
  
  const resetSwitch = () => {
    setSwitchState({ addMultiple: false });
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    resetSwitch();
  };
  
  const handleAdd = () => {
    addUserHandler(user);
    setUser(initialUser);
    
    if (switchState.addMultiple) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  
  const handleDateChange = (date) => {
    setUser({ ...user, age: date });
  };
  
  const handleChange = name => ({ target: { value } }) => {
    setUser({ ...user, [name]: value });
  };
  
  const handleCheckboxChange = name => () => {
    setUser({ ...user, [name]: !user.admin });
  };
  return (
    <div>
      <Tooltip title='Add'>
        <IconButton aria-label='add' onClick={handleClickOpen}>
          <Icon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        className={classes.root}
      >
        <DialogTitle id='form-dialog-title'>Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>Add User to database.</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            label='First Name'
            type='text'
            fullWidth
            value={user.firstName}
            onChange={handleChange('firstName')}
          />
          <TextField
            margin='dense'
            label='Last Name'
            type='text'
            fullWidth
            value={user.lastName}
            onChange={handleChange('lastName')}
          />
          <TextField
            margin='dense'
            label='Email'
            type='text'
            fullWidth
            value={user.email}
            autoComplete='new-password'
            onChange={handleChange('email')}
          />
          <TextField
            autoComplete='new-password'
            margin='dense'
            label='Password'
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={user.password}
            onChange={handleChange('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            autoComplete='new-password'
            margin='dense'
            label='Repeat Password'
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={user.password2}
            onChange={handleChange('password2')}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='dd/MM/yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Age'
              value={user.age}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            margin='dense'
            label='Team'
            type='text'
            fullWidth
            value={user.team}
            onChange={handleChange('team')}
          />
          <TextField
            margin='dense'
            label='Position'
            type='text'
            fullWidth
            value={user.position}
            onChange={handleChange('position')}
          />
          <TextField
            margin='dense'
            label='Role'
            type='text'
            fullWidth
            value={user.role}
            onChange={handleChange('role')}
          />
          <TextField
            margin='dense'
            label='About Info'
            type='text'
            fullWidth
            multiline
            rows={5}
            value={user.aboutInfo}
            onChange={handleChange('aboutInfo')}
          />
          <FormControlLabel
            control={(
              <GreenCheckbox
                checked={user.admin}
                onChange={handleCheckboxChange('admin')}
                name='admin'
              />
            )}
            label='Admin'
          />
          <FormControlLabel
            control={(
              <GreenCheckbox
                checked={user.isActive}
                onChange={handleCheckboxChange('isActive')}
                name='isActive'
              />
            )}
            label='Active'
          />
        </DialogContent>
        <DialogActions>
          {/* <Tooltip title='Add multiple'> */}
          {/*  <Switch */}
          {/*    checked={switchState.addMultiple} */}
          {/*    onChange={handleSwitchChange('addMultiple')} */}
          {/*    value='addMultiple' */}
          {/*    inputProps={{ 'aria-label': 'secondary checkbox' }} */}
          {/*  /> */}
          {/* </Tooltip> */}
          <Button onClick={handleAdd} color='primary'>
            Add
          </Button>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddUserDialog.propTypes = {
  Icon: PropTypes.any,
  addUserHandler: PropTypes.func.isRequired
};

AddUserDialog.defaultProps = {
  Icon: AddIcon
};

export default AddUserDialog;
