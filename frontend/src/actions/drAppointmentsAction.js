import axios from "axios"

export const startFetchDoctorAppointments = (doctorId)=> {
    return async(dispatch)=> {
        try{
            console.log('docId', doctorId)
            const response = await axios.get(`http://localhost:3321/api/appointments/doctor-slots?doctorId=${doctorId}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log('response', response.data)
            if(Array.isArray(response.data)) {
                dispatch(fetchDoctorAppointments(response.data))
            }
        } catch(err) {
            alert(err.message)
        }
    }
}

const fetchDoctorAppointments = (data)=> {
    return {type: 'FETCH_DOCTOR_APPOINTMENTS', payload: data}
}
