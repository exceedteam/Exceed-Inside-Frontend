import io from 'socket.io-client';
import jwtDecode from 'jwt-decode';

export default function socketMiddleware() {
	const socket = io(process.env.REACT_APP_DOMAIN);
	
  if (localStorage.getItem('token')) {
		const id = jwtDecode(localStorage.getItem('token')).id;
		socket.emit('id', id);
  }

	return ({ dispatch }) => (next) => (action) => {
		if (typeof action === 'function') {
			return next(action);
		}

		const { event, leave, handle, ...rest } = action;

		if (!event) {
			return next(action);
		}

		if (leave) {
			socket.removeListener(event);
		}

		let handleEvent = handle;
		if (typeof handleEvent === 'string') {
			handleEvent = (result) => dispatch({ type: handle, result, ...rest });
		}
		return socket.on(event, handleEvent);
	};
}