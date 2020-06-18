import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import useOutsideClick from '../../../libs/Hooks/useOutsideClick';


const SpringPopper = ({ children, value, onSave, onChange, onCancel, renderPopperComponent }) => {
  
  const ref = useRef(null);
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(( anchorEl ? null : event.currentTarget ));
  };
  
  const handleSave = () => {
    onSave();
    setAnchorEl(null);
  };
  
  const handleCancel = () => {
    onCancel();
    setAnchorEl(null);
  };
  
  const open = Boolean(anchorEl);
  const id = open ? 'spring-popper' : undefined;
  useOutsideClick(ref, handleCancel);
  
  const PopperChildren = renderPopperComponent({
    ref,
    value,
    onChange,
    onSave: handleSave,
    onCancel: handleCancel
  });
  return (
    <div>
      <div onClick={handleClick}>
        {children}
      </div>
      { !!PopperChildren && (
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
      >
        {
          PopperChildren
        }
      </Popper>
    )}
    </div>
  );
};

SpringPopper.propTypes = {
  children: PropTypes.element.isRequired,
  renderPopperComponent: PropTypes.func,
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),
  onSave: PropTypes.func,
  onChange: PropTypes.func,
  onCancel: PropTypes.func
};

SpringPopper.defaultProps = {
  value: '',
  renderPopperComponent: () => null,
  onSave: () => {
  },
  onChange: () => {
  },
  onCancel: () => {
  }
};
export default SpringPopper;



