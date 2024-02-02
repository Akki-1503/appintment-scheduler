// BookingContext.js
import { createContext, useContext, useReducer, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const BookingContext = createContext()

const initialState = {
  bookings: [],
  loading: true,
  error: null,
}

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKINGS':
      return {
        ...state,
        bookings: action.payload,
        loading: false,
        error: null,
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState)
  const  patientId  = useSelector((state) => state.user.user?._id)
  console.log('patient', patientId)

  const fetchBookings = async (patientId) => {
    console.log(patientId, 'patientid')
    try {
      const response = await axios.get(`http://localhost:3321/api/bookings/${patientId}`, {
        headers: {
            'Authorization' : localStorage.getItem('token')
        }
      })
      console.log('booking response', response)
      dispatch({ type: 'SET_BOOKINGS', payload: response.data })
    } catch (error) {
        console.log(error, 'err')
      dispatch({ type: 'SET_ERROR', payload: 'An error occurred while fetching bookings' })
    }
  }

  useEffect(() => {
    fetchBookings(patientId)
  }, [patientId]) 

  return (
    <BookingContext.Provider value={{ ...state }}>
      {children}
    </BookingContext.Provider>
  )
}

const useBookingContext = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider')
  }
  return context
}

export { BookingProvider, useBookingContext }
