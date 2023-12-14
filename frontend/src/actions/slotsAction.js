import axios from "axios"

export const startCreateSlots = (formData, history) => {
    return async(dispatch) => {
        try{
            const response = await axios.post('http://localhost:3321/api/slots/create', formData, {
                headers: {
                    'Authorization' : localStorage.getItem('token')
                }
            })
            console.log('res', response.data)
            dispatch(createSlots(response.data))
            history.push('/account')
        } catch(error) {
            alert(error)
        }
    }
}

const createSlots = (data) => {
    return {type: 'CREATE_SLOTS', payload: data}
}

export const startListSlots = (id) => {
    return async(dispatch)=> {
        try{
            const response = await axios.get(`http://localhost:3321/api/slots/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log('res', response.data)
            dispatch(listSlots(response.data))
        } catch(err) {
            alert(err.message)
        }
    }
}

const listSlots = (data) => {
    return {type: 'LIST_SLOTS', payload: data}
}

export const startRequestSlot = (slotId, history) => {
    return async(dispatch) => {
        try{
            const response = await axios.post(`http://localhost:3321/api/slots/book/${slotId}`, null,{
                headers: {
                    'Authorization': localStorage.getItem('token') 
                }
            })
            console.log('res', response.data)
            // history.push('/payment')
            dispatch(requestSlot(response.data))
        }catch(err) {
            alert(err.message)
        }
    }
}

const requestSlot = (data) => {
    return {type: 'REQUEST_SLOTS', payload: data}
}
