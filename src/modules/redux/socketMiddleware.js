import io from 'socket.io-client';

export default function socketMiddleware() {
  const socket = io(process.env.REACT_APP_DOMAIN);
  
  return ({ dispatch }) => next => (action) => {
    if (typeof action === 'function') {
      return next(action);
    }
    
    const {
      event,
      leave,
      handle,
      ...rest
    } = action;
    
    if (!event) {
      return next(action);
    }
    
    if (leave) {
      socket.removeListener(event);
    }
    
    let handleEvent = handle;
    if (typeof handleEvent === 'string') {
      handleEvent = result => dispatch({ type: handle, result, ...rest });
    }
    return socket.on(event, handleEvent);
  };
}