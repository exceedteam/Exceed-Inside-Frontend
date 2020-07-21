import {
  LOGIN_PROCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_PROCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  CHANGE_PASSWORD_PROCESS,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_CANCEL,
  CHANGE_PASSWORD_FAIL,
  REGISTER_CANCEL
} from '../actionTypes';

const initialState = {
  token: '',
  errorLogin: null,
  errorsRegistration: {},
  loading: false,
  changePasswordErrors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_PASSWORD_PROCESS:
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
    case REGISTER_CANCEL:
    case CHANGE_PASSWORD_CANCEL:
    case CHANGE_PASSWORD_SUCCESS:
    case REGISTER_SUCCESS: {
      return {
        ...state,
        errorsRegistration: {},
        changePasswordErrors: {},
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
    case CHANGE_PASSWORD_FAIL: {
      const { errors } = action.payload;
      return {
        ...state,
        changePasswordErrors: errors,
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
