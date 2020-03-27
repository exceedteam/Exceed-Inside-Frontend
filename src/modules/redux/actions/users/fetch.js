import {
	FETCH_USER_PROFILE_FAIL,
	FETCH_USER_PROFILE_PROCESS,
	FETCH_USER_PROFILE_SUCCESS,
	FETCH_ALL_USERS_PROCESS,
	FETCH_ALL_USERS_SUCCESS,
	FETCH_ALL_USERS_FAIL,
} from '../../actionTypes';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

// request to the server to get user data
export const fetchUserProfile = (id) => {
	return (dispatch) => {
		dispatch(fetchUserProfileProcess());
		const token = localStorage.getItem('token');
		return axios
			.get(`${url}/user/${id}`, {
				headers: { authorization: token }
			})
			.then((response) => {
				dispatch(fetchUserProfileSuccess(response.data));
				return response.data;
			})
			.catch((error) => {
				dispatch(fetchUserProfileFail(error));
			});
	};
};

export const fetchUserProfileSuccess = (profile) => {
	return {
		type: FETCH_USER_PROFILE_SUCCESS,
		payload: { profile }
	};
};

export const fetchUserProfileProcess = () => {
	return {
		type: FETCH_USER_PROFILE_PROCESS,
		payload: {}
	};
};

export const fetchUserProfileFail = (error) => {
	return {
		type: FETCH_USER_PROFILE_FAIL,
		payload: { error }
	};
};

export const fetchAllUsers = () => {
	return (dispatch) => {
		dispatch(fetchAllUsersProcess());
		const token = localStorage.getItem('token');
		return axios(`${url}/users`, {
			headers: { authorization: token }
		})
			.then((response) => {
				dispatch(fetchAllUsersSuccess(response.data));
			})
			.catch((error) => {
				dispatch(fetchAllUsersFail(error));
			});
	};
};

export const fetchAllUsersProcess = () => {
	return {
		type: FETCH_ALL_USERS_PROCESS
	};
};

export const fetchAllUsersSuccess = (users) => {
	return {
		type: FETCH_ALL_USERS_SUCCESS,
		payload: { users }
	};
};

export const fetchAllUsersFail = (error) => {
	return {
		type: FETCH_ALL_USERS_FAIL,
		payload: { error }
	};
};
