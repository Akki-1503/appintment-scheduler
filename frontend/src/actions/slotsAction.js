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
            window.alert('Slots created successfully')
        } catch(error) {
            alert(error)
        }
    }
}

const createSlots = (data) => {
    return {type: 'CREATE_SLOTS', payload: data}
}

export const startListSlots = (userId) => {
    console.log('userid', userId)
    return async(dispatch)=> {
        try{
            const response = await axios.get(`http://localhost:3321/api/slots/${userId}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log('slots res', response.data)
            dispatch(listSlots(response.data))
        } catch(err) {
            if(err.response && err.response.status === 404) {
                dispatch(slotsError(err.response.data.message))
            } else {
                dispatch(slotsError('An error occured while fetching slots'))
            }
        }
    }
}

const listSlots = (data) => {
    return {type: 'LIST_SLOTS', payload: data}
}

const slotsError = (message) => {
    return {type: 'SLOTS_ERROR', payload: message}
}

export const startRequestSlot = (slotId, navigatepayment) => {
    return async(dispatch) => {
        try{
            console.log('slotidfrom req ',slotId)
            const response = await axios.post(`http://localhost:3321/api/slots/book/${slotId}`, null,{
                headers: {
                    'Authorization': localStorage.getItem('token') 
                }
            })
            console.log('req res', response.data)
            dispatch(requestSlot(response.data))
            navigatepayment(response.data._id, response.data.doctor)
        }catch(err) {
            alert(err.message)
        }
    }
}

const requestSlot = (data) => {
    return {type: 'REQUEST_SLOTS', payload: data}
}
