import React, { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Spinner, Alert } from 'react-bootstrap' 
import { useHistory } from 'react-router-dom'

const paymentReducer = (state, action) => {
  switch (action.type) {
    case 'INITIATE_PAYMENT':
      return {
        ...state,
        loading: true,
        error: null,
        paymentUrl: null,
      }
    case 'PAYMENT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        paymentUrl: action.payload.paymentUrl,
      }
    case 'PAYMENT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        paymentUrl: null,
      }
    default:
      return state
  }
}

const initialState = {
  loading: false,
  error: null,
  paymentUrl: null,
}

const Payment = () => {
  const [state, dispatch] = useReducer(paymentReducer, initialState)
  const reduxDispatch = useDispatch()
  const info = useSelector(state => state.slots.slotInfo)
  console.log('info', info)
  const history = useHistory()

  const body = {doctorId: info.updatedSlot?.doctor, slotId: info.updatedSlot?._id }
  console.log('pay body', body)

  useEffect(() => {
    const initiatePayment = async () => {
      dispatch({ type: 'INITIATE_PAYMENT' })

        if(info.updatedSlot?._id) {
          try {
          console.log(info.updatedSlot?.doctor, info.updatedSlot?._id, 'insideuseeffect')
        const response = await axios.post('http://localhost:3321/api/checkout', body,{
            headers: {'Authorization': localStorage.getItem('token')}
        })
        console.log('payment response', response)
        localStorage.setItem("transactionId", response.data.id)
        window.location = response.data.url
        // console.log(window.location, 'win')
        // history.push(window.location = response.data.url)
        // const paymentUrl = response.data.url
        // console.log('paymenturl', paymentUrl)
        dispatch({ type: 'PAYMENT_SUCCESS', payload: { paymentUrl: response.data.url } })
        if (response.data.success) {
          window.location.href = 'http://localhost:3000/payment/success';
        }
      } catch (error) {
        console.error('Payment initiation error:', error.response) // Log the error response for debugging
        dispatch({ type: 'PAYMENT_FAILURE', payload: { error: 'payment initiation failed' } })
        reduxDispatch({ type: 'UPDATE_PAYMENT_STATUS', payload: { status: 'failure' } })
      }
        }
    }
    initiatePayment()
  }, [info, reduxDispatch])

  return (
    <div>
      <h2>Payment Process</h2>
      {state.loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Processing...</span>
        </Spinner>
      ) : (
        <div>
          {state.paymentUrl && (
            <div>
              <p>Payment URL: {state.paymentUrl}</p>
              <a href={state.paymentUrl} target="_blank" rel="noopener noreferrer">
                Go to Payment
              </a>
            </div>
          )}
          {state.error && <Alert variant="danger">Error: {state.error}</Alert>}
        </div>
      )}
    </div>
  )
}

export default Payment
