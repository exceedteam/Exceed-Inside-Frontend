import {
	// for main page
	FETCH_ALL_POSTS_SUCCESS,
	FETCH_ALL_POSTS_FAIL,
	FETCH_ALL_POSTS_PROCESS,
	FETCH_LIKE_FROM_SOCKET,
	FETCH_COMMENT_COUNTER_FROM_SOCKET,
	// for post page
	FETCH_POST_PROCESS,
	FETCH_POST_SUCCESS,
	FETCH_POST_FAIL,
	// for posts of user page
	FETCH_ALL_POSTS_OF_USER_PROCESS,
	FETCH_ALL_POSTS_OF_USER_SUCCESS,
	FETCH_ALL_POSTS_OF_USER_FAIL,
} from '../../actionTypes';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

// request all posts from the server
export const fetchPosts = ({ page = 0, perPage = 3 }) => {
	return (dispatch) => {
		dispatch(fetchPostsProcess());
		const token = localStorage.getItem('token');
		return axios
			.get(`${url}/posts?page=${page}&perPage=${perPage}`, {
				headers: { authorization: token }
			})
			.then((response) => {
				dispatch(fetchLikes());
				dispatch(fetchPostsSuccess(response.data));
			})
			.catch((error) => {
				dispatch(fetchPostsFail(error));
			});
	};
};

export const fetchPostsSuccess = (posts) => {
	return {
		type: FETCH_ALL_POSTS_SUCCESS,
		payload: { posts }
	};
};

export const fetchPostsProcess = () => {
	return {
		type: FETCH_ALL_POSTS_PROCESS,
		payload: {}
	};
};

export const fetchPostsFail = (error) => {
	return {
		type: FETCH_ALL_POSTS_FAIL,
		payload: { error }
	};
};

// Action creator with received function:
export function fetchLikes() {
	return (dispatch) =>
		dispatch({
			event: 'like',
			handle: (data) =>
				dispatch({
					type: FETCH_LIKE_FROM_SOCKET,
					payload: data
				})
		});
}

// request for a specific post from the server
export const fetchPost = ({ id, isPostsLoaded }) => {
	return (dispatch) => {
		dispatch(fetchLikes());
		dispatch(commentCounter());
		if (isPostsLoaded) {
			dispatch(fetchPostProcess());
			return dispatch(fetchPostSuccess({ id }));
		} else {
			dispatch(fetchPostProcess());
			const token = localStorage.getItem('token');
			return axios
				.get(`${url}/post/${id}`, {
					headers: { authorization: token }
				})
				.then((post) => {
					return dispatch(fetchPostSuccess({ post: post.data }));
				})
				.catch((error) => {
					dispatch(fetchPostFail(error));
				});
		}
	};
};

export const fetchPostProcess = () => {
	return {
		type: FETCH_POST_PROCESS,
		payload: {}
	};
};

export const fetchPostSuccess = ({ post, id }) => {
	return {
		type: FETCH_POST_SUCCESS,
		payload: {
			post: post,
			id: id
		}
	};
};

export const fetchPostFail = (error) => {
	return {
		type: FETCH_POST_FAIL,
		payload: { error }
	};
};

// request all posts of user from the server
export const fetchPostsOfUser = ({ id }) => {
	return (dispatch) => {
		dispatch(fetchPostsOfUserProcess());
		const token = localStorage.getItem('token');
		return axios
			.get(`${url}/user/${id}/posts`, {
				headers: { authorization: token }
			})
			.then((response) => {
				dispatch(fetchPostsOfUserSuccess(response.data));
			})
			.catch((error) => {
				dispatch(fetchPostsOfUserFail(error));
			});
	};
};

export const fetchPostsOfUserProcess = () => {
	return {
		type: FETCH_ALL_POSTS_OF_USER_PROCESS,
		payload: {}
	};
};

export const fetchPostsOfUserSuccess = (postsOfUser) => {
	return {
		type: FETCH_ALL_POSTS_OF_USER_SUCCESS,
		payload: { postsOfUser }
	};
};

export const fetchPostsOfUserFail = (errorsPostsOfUser) => {
	return {
		type: FETCH_ALL_POSTS_OF_USER_FAIL,
		payload: { errorsPostsOfUser }
	};
};

export const commentCounter = () => {
	return (dispatch) =>
		dispatch({
			event: 'commentCounter',
			handle: (data) =>
				dispatch({
					type: FETCH_COMMENT_COUNTER_FROM_SOCKET,
					payload: data
				})
		})
}