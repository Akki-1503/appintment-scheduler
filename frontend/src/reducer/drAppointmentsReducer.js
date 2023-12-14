const initialState = {
    appointments: [],
    loading: false,
    error: null
}

const doctorAppointmentsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_DOCTOR_APPOINTMENTS':
            return {
                ...state,
                appointments: action.payload
            }
            default:
                return state
    }
}

export default doctorAppointmentsReducer
