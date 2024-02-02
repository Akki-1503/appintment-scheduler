const initialState = {
  doctorProfiles: {}, 
  errors: {},
  isLoading: true
}

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      return {
        ...state,
        isLoading: false,
        doctorProfiles: action.payload
      }
    case 'FETCH_DOCTOR_PROFILE':
      console.log('Updating doctorProfiles with data:', action.payload)
      return {
        ...state,
        isLoading: false,
        doctorProfiles: action.payload
      }
    case 'EDIT_PROFILE':
      return {
        ...state,
        isLoading: false,
        doctorProfiles: action.payload
      }
    case 'FETCH_DOCTORS':
      return {
        ...state,
        isLoading: false,
        doctorProfiles: action.payload
      }
    case 'REMOVE_DOCTOR_SUCCESS':
      const updatedProfiles = { ...state.doctorProfiles }
      delete updatedProfiles[action.payload.doctorId] 
      return {
        ...state,
        isLoading: false,
        doctorProfiles: updatedProfiles
      }
    case 'REMOVE_DOCTOR_FAILURE':
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      }
    default:
      return state
  }
}

export default doctorReducer
