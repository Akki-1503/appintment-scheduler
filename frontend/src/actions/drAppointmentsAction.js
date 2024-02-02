import axios from "axios"

export const startFetchDoctorAppointments = (doctorId)=> {
    console.log('fetchDoc', doctorId)
    return async(dispatch)=> {
        try {
            const response = await axios.get(`http://localhost:3321/api/appointments/doctor-slots?userId=${doctorId.userId}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })

            console.log('appointment response', response.data)
            dispatch(fetchDoctorAppointmentsSuccess(response.data)) 

        } catch(err) {
            console.log('err', err)
            dispatch(fetchDoctorAppointmentsFailure(err.message)) 
        }
    }
}

const fetchDoctorAppointmentsSuccess = (data) => {
    return { type: 'FETCH_DOCTOR_APPOINTMENTS_SUCCESS', payload: data }
}

const fetchDoctorAppointmentsFailure = (error) => {
    return { type: 'FETCH_DOCTOR_APPOINTMENTS_FAILURE', payload: error }
}

const confirmAppointmentRequest = () => {
    return { type: 'CONFIRM_APPOINTMENT_REQUEST' }
}
  
const confirmAppointmentSuccess = (data) => {
    return { type: 'CONFIRM_APPOINTMENT_SUCCESS', payload: data }
}
  
const confirmAppointmentFailure = (error) => {
    return { type: 'CONFIRM_APPOINTMENT_FAILURE', payload: error }
}
  
export const startConfirmAppointment = (id) => {
    return async (dispatch) => {
      dispatch(confirmAppointmentRequest())
  
      try {
        const response = await axios.post(`http://localhost:3321/api/appointments/email/${id}`, { confimationStatus: 'confirmed' },  {
            headers: {
                'Authorization': localStorage.getItem('token')
            }})
        dispatch(confirmAppointmentSuccess(response.data))
      } catch (error) {
        dispatch(confirmAppointmentFailure(error.message))
      }
    }
}

export const startCancelAppointment = (id) => {
    return async(dispatch) => {
        try{
            const response = await axios.post(`http://localhost:3321/api/appointments/email/${id}`, { confimationStatus: 'cancelled' },  {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }})
            dispatch(confirmAppointmentSuccess(response.data))
        } catch(error) {
            console.log(error, 'err')
            dispatch(confirmAppointmentFailure(error.message))
        }
    }
}
