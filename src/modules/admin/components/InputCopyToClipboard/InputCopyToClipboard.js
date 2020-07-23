import React, { useState } from 'react';
import { Button, Input, Popup } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';

const InputCopyToClipboard = ({ value, children, ...props }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ timeOut, setTimeOut ] = useState();
  
  const handleOpen = () => {
    setIsOpen(true);
    setTimeOut(setTimeout(() => {
      setIsOpen(false);
    }, 1000));
  };
  
  const handleClose = () => {
    setIsOpen(false);
    clearTimeout(timeOut);
  };
  
  return (
    <Input
      {...props}
      value={value}
      action
    >
      <input />
      {children}
      <Popup
        content='Copied'
        on='click'
        pinned
        trigger={(
          <CopyToClipboard
            text={value}
            onCopy={handleOpen}
          >
            <Button icon='copy' />
          </CopyToClipboard>
        )}
        open={isOpen}
        onClose={handleClose}
        onOpen={handleOpen}
      />
    
    </Input>
  );
};

InputCopyToClipboard.propTypes = {
  value: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node
  ])
}

InputCopyToClipboard.defaultProps = {
  value: '',
  children: null
}


export default InputCopyToClipboard
