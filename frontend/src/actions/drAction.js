import axios from 'axios'

export const startUpdateProfile = ( data,history) => {
    return async (dispatch) => {
        try {
            console.log('data', data )
            const response = await axios.post('http://localhost:3321/api/doctors/create',data, {
                headers: {
                    'Authorization' : localStorage.getItem('token')
                }
            })
            const profileData = response.data
            console.log('profile', profileData)
            alert(profileData.message)
            dispatch(updateProfile(profileData))
           history.push('/account')
        } catch (err) {
            alert(err.message)
        }
    }
}

const updateProfile = (data) => {
    return {type: 'UPDATE_PROFILE', payload: data}
}

export const startFetchDoctorProfile = (id) => {
    return async(dispatch) => {
        try{
            console.log('Fetching doctor profile for id:', id)
            const response = await axios.get(`http://localhost:3321/api/doctors/show/${id}` , {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log('Doctor profile data:', response.data)
            dispatch(fetchDoctorProfile(response.data))
        } catch(err) {
            alert(err)
        }
    }
}

const fetchDoctorProfile = (data) => {
    console.log('Action payload:', data);
    return{type: 'FETCH_DOCTOR_PROFILE', payload: data}
}

export const startEditProfile = (formData, history) => {
    return async(dispatch) => {
        try{
            console.log(formData, 'fd')
                const response = await axios.put(`http://localhost:3321/api/doctors/${formData._id}` , formData, {
                    headers: {
                        'Authorization' : localStorage.getItem('token')
                    }
                })
                console.log('response', response.data)
                dispatch(editProfile(response.data))
                history.push('/account') 
        } catch(err) {
            alert(err.message)
        }
    }
}

const editProfile = (data) => {
    return {type: 'EDIT_PROFILE', payload: data}   
}

export const startFetchDoctors = () => {
    return async(dispatch) => {
        try{
            const response = await axios.get('http://localhost:3321/api/doctors/patient' , {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log('res', response.data)
            dispatch(fetchDoctors(response.data))
        } catch(err) {
            alert(err.message)
        }
    }
}

const fetchDoctors = (data) => {
    return{type: 'FETCH_DOCTORS', payload: data}
}
