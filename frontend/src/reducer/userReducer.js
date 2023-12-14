// userReducer.js
const initialState = {
  loggedInDoctor: null,
  error: '',
  user: null,
  isAuthenticated: false,
  token: null,
  role: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_REGISTERED':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: '',
      };
    case 'USER_LOGGED_IN':
      return {
        ...state,
        loggedInDoctor: action.payload.loggedInDoctor,
        error: '',
      };
    case 'USER_ACCOUNT':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        role: action.payload.role,
        token: action.payload.token,
        error: '',
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'REGISTER_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        loggedInDoctor: null,
        user: null,
        isAuthenticated: false,
        token: null,
        role: null,
        error: '',
      };
    default:
      return state;
  }
};

export default userReducer;
