import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './Table.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from './EnchantedTable';

const Table = ({ data, columns, updateData, title }) => {
  
  const [ skipPageReset, setSkipPageReset ] = React.useState(false);
  
  const updateMyData = useCallback((rowIndex, columnId, value, cell) => {
    setSkipPageReset(true);
    updateData(rowIndex, columnId, value, cell);
  }, [updateData, setSkipPageReset]) ;
  
  return (
    <div className='table'>
      <CssBaseline />
      <EnhancedTable
        title={title}
        columns={columns}
        data={data}
        setData={() => {}}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </div>
  );
};


Table.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  updateData: PropTypes.func,
};

Table.defaultProps = {
  title: '',
  updateData: () => {},
};

export default Table;
