//login
export const LOGIN_PROCESS = "LOGIN_PROCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT = "LOGOUT";

// registration
export const REGISTER_PROCESS = "REGISTER_PROCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

// main page (all posts)
export const FETCH_ALL_POSTS_PROCESS = "FETCH_ALL_POSTS_PROCESS";
export const FETCH_ALL_POSTS_SUCCESS = "FETCH_ALL_POSTS_SUCCESS";
export const FETCH_ALL_POSTS_FAIL = "FETCH_ALL_POSTS_FAIL";

// posts of user
export const FETCH_ALL_POSTS_OF_USER_PROCESS = "FETCH_ALL_POSTS_OF_USER_PROCESS";
export const FETCH_ALL_POSTS_OF_USER_SUCCESS = "FETCH_ALL_POSTS_OF_USER_SUCCESS";
export const FETCH_ALL_POSTS_OF_USER_FAIL = "FETCH_ALL_POSTS_OF_USER_FAIL";
export const CLEAR_ALL_POSTS_OF_USER = "CLEAR_ALL_POSTS_OF_USER"

// post page
export const FETCH_POST_PROCESS = "FETCH_POST_PROCESS";
export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_POST_FAIL = "FETCH_POST_FAIL";

export const FETCH_LIKE_FROM_SOCKET = "FETCH_LIKE_FROM_SOCKET";
export const FETCH_COMMENT_COUNTER_FROM_SOCKET = "FETCH_COMMENT_COUNTER_FROM_SOCKET";

// create the new post
export const CREATE_POST_PROCESS = "CREATE_POST_PROCESS";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAIL = "CREATE_POST_FAIL";

// user profile
export const FETCH_USER_PROFILE_PROCESS = "FETCH_USER_PROFILE_PROCESS";
export const FETCH_USER_PROFILE_FAIL = "FETCH_USER_PROFILE_FAIL";
export const FETCH_USER_PROFILE_SUCCESS = "FETCH_USER_PROFILE_SUCCESS";
export const CLEAR_USER_PROFILE = "CLEAR_USER_PROFILE";

// all users
export const FETCH_ALL_USERS_PROCESS = "FETCH_ALL_USERS_PROCESS";
export const FETCH_ALL_USERS_SUCCESS = "FETCH_ALL_USERS_SUCCESS";
export const FETCH_ALL_USERS_FAIL = "FETCH_ALL_USERS_FAIL";

// edit user profile
export const EDIT_USER_PROFILE_PROCESS = "EDIT_USER_PROFILE_PROCESS";
export const EDIT_USER_PROFILE_FAIL = "EDIT_USER_PROFILE_FAIL";
export const EDIT_USER_PROFILE_SUCCESS = "EDIT_USER_PROFILE_SUCCESS";

// likes, dislikes of posts
export const EDIT_LIKE_OF_POST_SUCCESS = "EDIT_LIKE_OF_POST_SUCCESS";
export const EDIT_DISLIKE_OF_POST_SUCCESS = "EDIT_DISLIKE_OF_POST_SUCCESS";

// create the new event
export const CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";
export const CREATE_EVENT_FAIL = "CREATE_EVENT_FAIL";
export const CREATE_EVENT_PROCESS = "CREATE_EVENT_PROCESS";

// all events
export const FETCH_ALL_EVENTS_PROCESS = "FETCH_ALL_EVENTS_PROCESS";
export const FETCH_ALL_EVENTS_SUCCESS = "FETCH_ALL_EVENTS_SUCCESS";
export const FETCH_ALL_EVENTS_FAIL = "FETCH_ALL_EVENTS_FAIL";

// delete the event
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const DELETE_EVENT_FAIL = "DELETE_EVENT_FAIL";
export const DELETE_EVENT_PROCESS ="DELETE_EVENT_PROCESS";

// edit event
export const EDIT_EVENT_SUCCESS = "EDIT_EVENT_SUCCESS";
export const EDIT_EVENT_PROCESS = "EDIT_EVENT_PROCESS";
export const EDIT_EVENT_FAIL = "EDIT_EVENT_FAIL";

// subscribe
export const EDIT_SUBSCRIBE_TO_EVENT = "EDIT_SUBSCRIBE_TO_EVENT";
export const EDIT_UNSUBSCRIBE_TO_EVENT = "EDIT_UNSUBSCRIBE_TO_EVENT";
export const EDIT_SUBSCRIBTION_TO_EVENT_PROCESS = "EDIT_SUBSCRIBTION_TO_EVENT_PROCESS";
export const EDIT_SUBSCRIBE_TO_ALL_EVENTS = "EDIT_SUBSCRIBE_TO_ALL_EVENTS";
export const EDIT_UNSUBSCRIBE_TO_ALL_EVENTS = "EDIT_UNSUBSCRIBE_TO_ALL_EVENTS";
export const EDIT_SUBSCRIBTION_TO_ALL_EVENTS_PROCESS = "EDIT_SUBSCRIBTION_TO_ALL_EVENTS_PROCESS";

// comments
export const FETCH_COMMENTS_OF_POST_PROCESS = "FETCH_COMMENTS_OF_POST_PROCESS";
export const FETCH_COMMENTS_OF_POST_SUCCESS = "FETCH_COMMENTS_OF_POST_SUCCESS";
export const FETCH_COMMENTS_OF_POST_FAIL = "FETCH_COMMENTS_OF_POST_FAIL";

// create comment
export const CREATE_COMMENT_PROCESS = "CREATE_COMMENT_PROCESS";
export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
export const CREATE_COMMENT_FAIL = "CREATE_COMMENT_FAIL";
export const FETCH_NEW_COMMENT = "FETCH_NEW_COMMENT";

//remove post data
export const CLEAR_CURRENT_COMMENTS = "CLEAR_CURRENT_COMMENTS";
export const CLEAR_CURRENT_POST = "CLEAR_CURRENT_POST";

// remove message of the store
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";