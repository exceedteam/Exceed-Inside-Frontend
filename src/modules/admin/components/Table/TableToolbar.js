import React from 'react';

import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GlobalFilter from './GlobalFilter';
import AddUserDialog from '../AddUserDialog';

const useToolbarStyles = makeStyles(theme => ( {
  root: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  title: {
    flex: '1 1 100%'
  }
} ));

const TableToolbar = props => {
  const classes = useToolbarStyles();
  const {
    title,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter
  } = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: false
      })}
    >
      <AddUserDialog />
      
      <Typography className={classes.title} variant='h6' id='tableTitle'>
        {title}
      </Typography>
      
      
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  title: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired,
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.string
};

TableToolbar.defaultProps = {
  title: '',
  globalFilter: ''
};

export default TableToolbar;
