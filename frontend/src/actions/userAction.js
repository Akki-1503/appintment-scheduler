import axios from 'axios'

export const startRegisteruser = (userData,history) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3321/api/users/register', userData)
            dispatch(userRegister(response.data))
            history.push('/login')
        } catch(err) {
            alert(err.message)
        }
    }
}

const userRegister = (userData) => {
    return {type: "USER_REGISTER", payload: userData}
}

export const startLoginUser = (userData, history) => {
    return async(dispatch) => {
        try{
            console.log('User Data:', userData);
            const response = await axios.post('http://localhost:3321/api/users/login', userData)
            const { token } = response.data
            localStorage.setItem('token', token)
            const user = await axios.get('http://localhost:3321/api/users/account', { headers: {
                'Authorization' : token 
            }})
            dispatch(userLogin(user)); 
            history.push('/account')
        } catch(err) {
            alert(err.message)
        }
    }
}

const userLogin = ( token) => {
    return {type: "USER_LOGIN", payload: token}
}

export const startGetUserAccount = () => {
    return async(dispatch) => {
        try{
            const token = localStorage.getItem('token')
            console.log('tok', token)
            const response = await axios.get('http://localhost:3321/api/users/account', {
                headers: {
                  'Authorization' : `${token}`
                }
            })
            console.log('serverResponse', response.data)
               dispatch(userAccount(response.data))
        } catch(err) {
            alert(err.message)
        }
    }
}

const userAccount = (userData) => {
    return {type: "USER_ACCOUNT", payload: userData}
}


// export const startGetUserAccount = () => {
//     return async (dispatch) => {
//         try {
//             // Check if token exists in local storage
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 // Handle the case where the token is not found
//                 throw new Error('Token not found in local storage.');
//             }

//             const response = await axios.get('http://localhost:3321/api/users/account', {
//                 headers: {
//                     'Authorization': `${token}` // Include 'Bearer' prefix
//                 }
//             });
//             console.log('response', response.data)
//             // Check if the response status is 200 (OK) before dispatching
//             if (response.status === 200) {
//                 dispatch(userAccount(response.data));
//             } else {
//                 // Handle unexpected response status codes here
//                 console.error('Unexpected response status:', response.status);
//                 throw new Error('Failed to fetch user account.');
//             }
//         } catch (err) {
//             // Handle errors gracefully, you can log them or dispatch an error action
//             console.error('Fetch User Account Error:', err);
//             throw err; // Rethrow the error for component handling
//         }
//     };
// };

// const userAccount = (data) => {
//     return { type: "USER_ACCOUNT", payload: data };
// c};


// export const startLoginUser = (userData, history) => {
//     return async(dispatch) => {
//         try{
//             console.log('User Data:', userData);
//             const response = await axios.post('http://localhost:3321/api/users/login', userData)
//             const { token } = response.data; // Destructure user and token from response.data
//             localStorage.setItem('token', token)
//             const user = await axios.get('http://localhost:3321/api/users/account', { headers: {
//                 'Authorization' : token 
//             }})
//             dispatch(userLogin(user)); // Pass both user and token as separate payload
//             history.push('/account')
//         } catch(err) {
//             alert(err.message)
//         }
//     }
// }