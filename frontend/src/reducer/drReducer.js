const initialState = {
  doctorProfiles: {}, 
  errors: {},
  isLoading: true
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE':
      return {
        ...state,
        doctorProfiles: action.payload
      };
    case 'FETCH_DOCTOR_PROFILE':
      console.log('Updating doctorProfiles with data:', action.payload)
      return {
        ...state,
        doctorProfiles: action.payload
      };
    case 'EDIT_PROFILE':
      return {
        ...state,
        doctorProfiles: action.payload
      };
    case 'FETCH_DOCTORS':
      return {
        ...state,
        doctorProfiles: action.payload // Store an array of doctor profiles
      };
    default:
      return state;
  }
};

export default doctorReducer;
