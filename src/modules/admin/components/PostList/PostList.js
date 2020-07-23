import React, { useCallback, useMemo } from 'react';
import './PostList.scss';
import PropTypes from 'prop-types';
import PostElement from './PostElement';
import List from '../List';


const PostList = ({ list, selected, setSelected }) => {
  
  const handleSelect = useCallback((id) => {
    setSelected(id);
  }, [setSelected]);
  
  const memoizedElements = useMemo(() => {
    return list.map(({ id, email, fullName }, index) => (
      <PostElement
        id={id}
        isSelected={(id === selected) || (!selected && !index)}
        onClick={handleSelect}
        email={email}
        name={fullName}
      />
    ));
  }, [ list, selected, handleSelect ]);
  
  return (
    <div className='list_container'>
      <List elements={memoizedElements} />
    </div>
  );
};

PostList.propTypes = {
  list: PropTypes.array.isRequired,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
};
PostList.defaultProps = {
  selected: '',
  setSelected: () => {}
};

export default PostList;
