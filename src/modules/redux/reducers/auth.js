import {
  LOGIN_PROCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_PROCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from '../actionTypes';

const initialState = {
  token: '',
  user: {},
  errorLogin: null,
  errorsRegistration: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_PROCESS:
    case LOGIN_PROCESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_SUCCESS: {
      const { token } = action.payload;
      localStorage.setItem('token', token);
      return {
        ...state,
        token,
        errorLogin: null,
        loading: false,
      };
    }
    case LOGIN_FAIL: {
      const { errors } = action.payload;
      return {
        ...state,
        errorLogin: errors,
        loading: false,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        errorsRegistration: {},
        loading: false,
      };
    }
    case REGISTER_FAIL: {
      const { errors } = action.payload;
      return {
        ...state,
        errorsRegistration: errors,
        loading: false,
      };
    }
    case LOGOUT: {
      localStorage.removeItem('token');
      return {
        ...state,
        token: '',
      };
    }
    default:
      return state;
  }
}
