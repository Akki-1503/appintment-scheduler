const initialState = {
    user: null,
    isAuthenticated: false,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_USER':
            return {
              ...state,
              user: action.payload,    // Update the user property with user data from action.payload
              isAuthenticated: true,  // Set isAuthenticated to true to indicate the user is now authenticated
            };
        case 'LOGIN_USER':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        
      case 'GET_USER_ACCOUNT':
        return state;
  
      case 'LOGOUT_USER':
        return {
          ...state,
          user: null,
          isAuthenticated: false,
        };
  
      default: {
        return state;
      }
    }
  };
  
  export default userReducer;
  