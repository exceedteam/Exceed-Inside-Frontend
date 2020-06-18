import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaUTable from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
// import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
// import IconButton from '@material-ui/core/IconButton';
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from 'react-table';
import TableToolbar from './TableToolbar';
import TablePaginationActions from './TablePaginationActions';
import { createID } from '../../../../services/helpers';
import EditableCell from './EditableCell/EditableCell';

const useStyles = makeStyles({
  pagination: {
    overflow: 'hidden'
  }
});


const EnhancedTable = ({
                         title,
                         columns,
                         data,
                         setData,
                         updateMyData,
                         skipPageReset
                       }) => {
  const defaultColumn = React.useMemo(
    () => ( {
      Cell: EditableCell
    } ),
    []
  );
  
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API
      updateMyData
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
    // hooks => {
    //   hooks.allColumns.push(columns => [
    // Let's make a column for selection
    //     {
    //       id: 'selection',
    // The header can use the table's getToggleAllRowsSelectedProps method
    // to render a checkbox.  Pagination is a problem since this will
    // select all
    // rows even though not all rows are on the current page.
    // The solution should
    // be server side pagination.  For one, the clients should
    // not download all
    // rows in most cases.  The client should only download data
    // for the current page.
    // In that case, getToggleAllRowsSelectedProps works fine.
    // Header: ({ getToggleAllRowsSelectedProps }) => (
    //   <div>
    
    //   </div>
    // ),
    // The cell can use the individual row's
    // getToggleRowSelectedProps method
    // to the render a checkbox
    //       Cell: () => (
    //         <div>
    //          <IconButton>
    //            <CreateOutlinedIcon />
    //          </IconButton>
    //         </div>
    //       )
    //     },
    //     ...columns
    //   ]);
    // }
  );
  
  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };
  
  const handleChangeRowsPerPage = event => {
    setPageSize(Number(event.target.value));
  };
  
  const classes = useStyles();
  // Render the UI for your table
  return (
    <TableContainer>
      <TableToolbar
        title={title}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                  key={createID()}
                  padding='none'
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  {...( column.id === 'selection'
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()) )}
                >
                  {column.render('Header')}
                  {column.id !== 'selection' ? (
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state
                      // which is not treated here
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <TableRow
                {...row.getRowProps()}
                key={createID()}
              >
                {row.cells.map(cell => {
                  return (
                    <TableCell
                      key={createID()}
                      
                      padding='none'
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        
        <TableFooter>
          <TableRow>
            <TablePagination
              className={classes.pagination}
              rowsPerPageOptions={[
                5,
                10,
                25,
                { label: 'All', value: data.length - 1 }
              ]}
              colSpan={4}
              count={data.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </TableContainer>
  );
};

EnhancedTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  updateMyData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  skipPageReset: PropTypes.bool.isRequired
};

EnhancedTable.defaultProps = {
  title: ''
};

export default EnhancedTable;
