import axios from 'axios'

export const startRegisteruser = (userData,historyuserData,history) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3321/api/users/register')
            dispatch(userRegister(response.data))
        } catch(err) {
            alert(err.message)
        }
    }
}

const userRegister = (userData) => {
    return {type: "USER_REGISTER", payload: userData}
}

export const startLoginUser = (userData) => {
    return async(dispatch) => {
        try{
            const response = await axios.post('http://localhost:3321/api/users/login', userData)
            dispatch(userLogin(response.data))
        } catch(err) {
            alert(err.message)
        }
    }
}

const userLogin = (userData) => {
    return {type: "USER_LOGIN", payload: userData}
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