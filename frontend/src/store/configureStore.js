import { createStore, combineReducers, applyMiddleware} from 'redux' 
import thunk from 'redux-thunk'
import userReducer from '../reducer/userReducer'
import doctorReducer from '../reducer/drReducer'
import slotReducer from '../reducer/slotsReducer'
import doctorAppointmentsReducer from '../reducer/drAppointmentsReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        doctor: doctorReducer,
        slots: slotReducer,
        doctorAppointments: doctorAppointmentsReducer
    }), applyMiddleware(thunk))
    return store 
}

export default configureStore
