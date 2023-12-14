const initialState = {
    slots: []
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
                slots: action.payload
            }
            default: 
                return state
    }
}

export default slotReducer
