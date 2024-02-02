const initialState = {
    slots: [],
    slotInfo: {},
    error: null
}

const slotReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CREATE_SLOTS':   
            console.log('action', action)
            return {
                ...state,
                slots: action.payload
            }
        case 'LIST_SLOTS': 
            console.log('action', action)
            return {
                ...state,
                slots: action.payload,
                error: null
            }
        case 'REQUEST_SLOTS':
            return {
                ...state,
                slotInfo: action.payload
            }
        case 'SLOTS_ERROR' :
            return {
                ...state,
                error: action.payload
            }
            default: 
                return state
    }
}

export default slotReducer
