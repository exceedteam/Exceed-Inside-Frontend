import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Search.scss';
import { Input, Icon } from 'semantic-ui-react';

const Search = ({ title, setSearchValue }) => {
  const inputRef = useRef();
  
  const [ isSearch, setIsSearch ] = React.useState(false);
  const [ searchTerm, setSearchTerm ] = React.useState('');
  
  const handleChange = event => {
    setSearchTerm(event.target.value);
    setSearchValue(event.target.value);
  };
  
  const handleSearch = () => {
    setIsSearch( !isSearch);
  };
  
  useEffect(() => {
    if (isSearch && inputRef.current) inputRef.current.focus();
    if ( !isSearch) {
      setSearchTerm('');
      setSearchValue('');
    }
  }, [ inputRef, isSearch, setSearchValue ]);
  
  return (
    <div className='search_container'>
      { !isSearch && (
        <h2>{title}</h2>
      )}
      {isSearch && (
        <Input
          ref={inputRef}
          size='small'
          placeholder='Search'
          value={searchTerm}
          onChange={handleChange}
          transparent
        />
      )}
      <div className='search_button' onClick={handleSearch}>
        { !isSearch && <Icon link name='search' />}
        {isSearch && <Icon link name='cancel' />}
      </div>
    </div>
  );
};

Search.propTypes = {
  title: PropTypes.string,
  setSearchValue: PropTypes.func
};

Search.defaultProps = {
  setSearchValue: () => {
  },
  title: ''
};

export default Search;
