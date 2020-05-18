import {
	FETCH_COMMENTS_OF_POST_PROCESS,
	FETCH_COMMENTS_OF_POST_SUCCESS,
	FETCH_COMMENTS_OF_POST_FAIL,
	FETCH_NEW_COMMENT
} from '../../actionTypes';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

// request all post comments from the server
export const fetchComments = ({ id, page = 0, perPage = 10, commentId = 0 }) => {
	return (dispatch) => {
		dispatch(fetchCommentsOfPostProcess());
		const token = localStorage.getItem('token');
		return axios
			.get(`${url}/post/${id}/comments?page=${page}&perPage=${perPage}&commentId=${commentId}`, {
				headers: { authorization: token }
			})
			.then((response) => {
				dispatch(fetchCommentsOfPostSuccess(response.data));
			})
			.catch((error) => {
				dispatch(fetchCommentsOfPostFail(error));
			});
	};
};

export const fetchCommentsOfPostProcess = () => {
	return {
		type: FETCH_COMMENTS_OF_POST_PROCESS,
		payload: {}
	};
};

export const fetchCommentsOfPostSuccess = (comments) => {
	return {
		type: FETCH_COMMENTS_OF_POST_SUCCESS,
		payload: { comments }
	};
};

export const fetchCommentsOfPostFail = (error) => {
	return {
		type: FETCH_COMMENTS_OF_POST_FAIL,
		payload: { error }
	};
};

// Action creator with received function:
export function fetchNewComment() {
	return (dispatch) =>
		dispatch({
			event: 'newComment',
			handle: (data) => {
				return dispatch({
					type: FETCH_NEW_COMMENT,
					payload: { comment: data }
				});
			}
		});
}
