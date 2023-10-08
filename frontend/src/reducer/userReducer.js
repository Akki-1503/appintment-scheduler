const initialState = {
    user: null,
    isAuthenticated: false,
    token: null
}
  
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_REGISTER':
            return {
              ...state,
              user: action.payload,   
              isAuthenticated: true
            }
        case 'USER_LOGIN':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case 'USER_ACCOUNT':
          console.log('action', action)
          return {
            ...state,
            user: action.payload, // Set the user object from action.payload
            isAuthenticated: true
          } 
        case 'LOGOUT_USER':
          return {
            ...state,
            user: null,
            isAuthenticated: false,
          }
        default: 
          return state
      }
}
  
export default userReducer
