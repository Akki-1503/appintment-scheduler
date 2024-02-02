const initialState = {
    appointments: [],
    loading: false,
    error: null
};

const doctorAppointmentsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_DOCTOR_APPOINTMENTS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'FETCH_DOCTOR_APPOINTMENTS_SUCCESS':
            return {
                ...state,
                loading: false,
                appointments: action.payload
            };
        case 'FETCH_DOCTOR_APPOINTMENTS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'CONFIRM_APPOINTMENT_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'CONFIRM_APPOINTMENT_SUCCESS':
            return {
                ...state,
                loading: false,
                appointments: action.payload, 
                error: null,
            };
        case 'CONFIRM_APPOINTMENT_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload, 
            };
        default:
            return state
    }
};

export default doctorAppointmentsReducer
