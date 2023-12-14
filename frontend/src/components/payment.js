// import React, {useEffect, useReducer} from "react"
// import { useDispatch } from "react-redux"
// import axios from 'axios'

// const paymentReducer = (state, action) => {
//     switch(action.type) {
//         case 'INITIATE_PAYMENT':
//             console.log('action', action)
//             return{
//                 ...state,
//                 loading: true,
//                 error: null,
//                 paymentUrl: null
//             }
//         case 'PAYMENT_SUCCESS': console.log('action', action)
//             return{
//                 ...state,
//                 loading: false,
//                 error: null,
//                 paymentUrl: action.payload.paymentUrl
//             }
//         case 'PAYMENT_FAILURE': console.log('action', action)
//             return{
//                 ...state,
//                 loading: false,
//                 error: action.payload.error,
//                 paymentUrl: null
//             }
//             default: 
//                 return state
//     }
// }

// const initialState = {
//     loading: false,
//     error: null,
//     paymentUrl: null
// }

// const Payment = ({doctorId, slotId}) => {
//     const [state, dispatch] = useReducer(paymentReducer, initialState)
//     const reduxDispatch = useDispatch()

//     useEffect(() => {
//         const initiatePayment = async() => {
//             dispatch({type: 'INITIATE_PAYMENT'})
//             try{
//                 const response = await axios.post('http://localhost:3321/api/checkout', {doctorId, slotId})
//                 console.log('paymentresponse', response)
//                 const paymentUrl = response.data.paymentUrl
//                 dispatch({type: 'PAYMENT_SUCCESS', payload: {paymentUrl}})
//             } catch(error) {
//                 dispatch({type: 'PAYMENT_FAILURE', payload: {error: 'payment initiation failed'}})
//                 reduxDispatch({ type: 'UPDATE_PAYMENT_STATUS', payload: { status: 'failure' } })
//         }
//     }
//         initiatePayment()
//     }, [doctorId, slotId, reduxDispatch])
//     return(
//         <div>
//             <h2>Payment Process</h2>
//             {state.loading ? (
//                 <p>Processing...</p>
//             ) : (
//                 <div>
//                     {state.paymentUrl && (
//                         <div>
//                             <p>Payment URL: {state.paymentUrl} </p>
//                             <a href={state.paymentUrl} target="_blank" rel="noopener noreferrer">Go to Payment</a>
//                         </div>
//                     )}
//                     {state.error && <p>Error: {state.error}</p>}
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Payment




import React, { useEffect, useReducer } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Spinner, Alert } from 'react-bootstrap' // Import the Bootstrap components

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

const Payment = ({ doctorId, slotId }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialState)
  const reduxDispatch = useDispatch()

  useEffect(() => {
    const initiatePayment = async () => {
      dispatch({ type: 'INITIATE_PAYMENT' })
      try {
        const response = await axios.post('http://localhost:3321/api/checkout', {
          doctorId,
          slotId,
        },{
            headers: {'Authorization': localStorage.getItem('token')}
        })
        console.log('payment response', response)
        const paymentUrl = response.data.paymentUrl
        console.log('paymenturl', paymentUrl)
        dispatch({ type: 'PAYMENT_SUCCESS', payload: { paymentUrl } })
      } catch (error) {
        console.error('Payment initiation error:', error.response) // Log the error response for debugging
        dispatch({ type: 'PAYMENT_FAILURE', payload: { error: 'payment initiation failed' } })
        reduxDispatch({ type: 'UPDATE_PAYMENT_STATUS', payload: { status: 'failure' } })
      }
    }
    initiatePayment()
  }, [doctorId, slotId, reduxDispatch])

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






// // Payment component
// import React, { useEffect, useReducer } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { Spinner, Alert } from 'react-bootstrap'
// import { startRequestSlot } from '../actions/slotsAction'
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

// const paymentReducer = (state, action) => {
//   switch (action.type) {
//     case 'INITIATE_PAYMENT':
//       return {
//         ...state,
//         loading: true,
//         error: null,
//         paymentUrl: null,
//       }
//     case 'PAYMENT_SUCCESS':
//       return {
//         ...state,
//         loading: false,
//         error: null,
//         paymentUrl: action.payload.paymentUrl,
//       }
//     case 'PAYMENT_FAILURE':
//       return {
//         ...state,
//         loading: false,
//         error: action.payload.error,
//         paymentUrl: null,
//       }
//     default:
//       return state
//   }
// }

// const initialState = {
//   loading: false,
//   error: null,
//   paymentUrl: null,
// }

// const Payment = ({ userId, slotId }) => {
//   const [state, dispatch] = useReducer(paymentReducer, initialState)
//   const reduxDispatch = useDispatch()
//   const { id } = useParams()

//   const user = useSelector((state) => state.user)
//   const slots = useSelector((state) => state.slots.slots)
//   console.log('slots', slots)
//   // const slotId = slots.length > 0 ? slots[0]._id : null // Assuming the first slot should be used

//   useEffect(() => {
//     dispatch(startRequestSlot(id))
//   }, [dispatch, id])

//   useEffect(() => {
//     const initiatePayment = async () => {
//       dispatch({ type: 'INITIATE_PAYMENT' })
//       try {
//         const response = await axios.post('http://localhost:3321/api/checkout', {
//           doctorId: user.user._id, // Pass userId to fetch doctor's profile
//           slotId: slotId,
//         }, {
//           headers: { 'Authorization': localStorage.getItem('token') },
//         })
//         const paymentUrl = response.data.paymentUrl
//         dispatch({ type: 'PAYMENT_SUCCESS', payload: { paymentUrl } })
//       } catch (error) {
//         console.error('Payment initiation error:', error.response) // Log the error response for debugging
//         dispatch({ type: 'PAYMENT_FAILURE', payload: { error: 'payment initiation failed' } })
//         reduxDispatch({ type: 'UPDATE_PAYMENT_STATUS', payload: { status: 'failure' } })
//       }
//     }
//     initiatePayment()
//   }, [userId, slotId, reduxDispatch, user])

//   return (
//     <div>
//       <h2>Payment Process</h2>
//       {state.loading ? (
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Processing...</span>
//         </Spinner>
//       ) : (
//         <div>
//           {state.paymentUrl && (
//             <div>
//               <p>Payment URL: {state.paymentUrl}</p>
//               <a href={state.paymentUrl} target="_blank" rel="noopener noreferrer">
//                 Go to Payment
//               </a>
//             </div>
//           )}
//           {state.error && <Alert variant="danger">Error: {state.error}</Alert>}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Payment









//payment redux

// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { startInitiatePayment } from '../actions/paymentActions'
// import { Spinner, Alert } from 'react-bootstrap'

// const Payment = ({ doctorId, slotId }) => {
//   const dispatch = useDispatch()

//   // Fetching payment-related state from Redux store
//   const { loading = false, error = null, paymentUrl = null } = useSelector((state) => state.payment || {})

//   useEffect(() => {
//     // Initiating payment when component mounts
//     dispatch(startInitiatePayment(doctorId, slotId))
//   }, [dispatch, doctorId, slotId])

//   return (
//     <div>
//       <h2>Payment Process</h2>
//       {loading ? (
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Processing...</span>
//         </Spinner>
//       ) : (
//         <div>
//           {paymentUrl && (
//             <div>
//               <p>Payment URL: {paymentUrl}</p>
//               <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
//                 Go to Payment
//               </a>
//             </div>
//           )}
//           {error && <Alert variant="danger">Error: {error}</Alert>}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Payment





//usestate payment

// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const Payment = ({ doctorId, slotId }) => {
//   const [paymentUrl, setPaymentUrl] = useState('')
//   const [paymentStatus, setPaymentStatus] = useState('pending')

//   useEffect(() => {
//     const fetchPayment = async () => {
//       try {
//         const response = await axios.post('http://localhost:3321/api/checkout',{ doctorId, slotId },{
//             headers: {
//               'Authorization': localStorage.getItem('token'), // Include the token in the Authorization header
//             },
//           }
//         )
//         const { url } = response.data
//         setPaymentUrl(url)

//         setTimeout(() => {
//           checkPaymentStatus()
//         }, 3000)
//       } catch (error) {
//         console.error('Error during payment checkout:', error.message)
//         // Handle error (display message to the user, etc.)
//       }
//     }

//     fetchPayment()
//   }, [doctorId, slotId])

//   const checkPaymentStatus = async () => {
//     try {
//       const response = await axios.post('http://localhost:3321/api/paymentstatus',
//         { sessionId: slotId },
//         {
//           headers: {
//             'Authorization':  localStorage.getItem('token') // Include the token in the Authorization header
//           },
//         }
//       )
//       const { status } = response.data
//       setPaymentStatus(status)

//       if (status === 'paid') {
//         console.log('Payment successful!')
//       } else {
//         console.log('Payment not successful')
//       }
//     } catch (error) {
//       console.error('Error retrieving payment status:', error.message)
//       // Handle error (display message to the user, etc.)
//     }
//   }

//   return (
//     <div>
//       <h2>Payment Page</h2>
//       {paymentStatus === 'pending' && <p>Processing payment...</p>}
//       {paymentStatus !== 'pending' && paymentUrl && (
//         <iframe title="PaymentFrame" src={paymentUrl} width="100%" height="800px" />
//       )}
//     </div>
//   )
// }

// export default Payment









// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// const Payment = ({ doctorId, slotId }) => {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [paymentUrl, setPaymentUrl] = useState(null)

//   useEffect(() => {
//     const initiatePayment = async () => {
//       setLoading(true)
//       try {
//         const response = await axios.post(
//           'http://localhost:3321/api/checkout',
//           {
//             doctorId,
//             slotId,
//           },
//           {
//             headers: { 'Authorization': localStorage.getItem('token') },
//           }
//         )
//         const { url } = response.data
//         setPaymentUrl(url)
//         setLoading(false)
//       } catch (error) {
//         setError('Payment initiation failed')
//         setLoading(false)
//       }
//     }

//     initiatePayment()
//   }, [doctorId, slotId])

//   const handleCheckout = () => {
//     // Redirect to the payment URL to initiate the checkout process
//     window.location.href = paymentUrl
//   }

//   return (
//     <div>
//       <h2>Payment Page</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       {paymentUrl && (
//         <>
//           <p>Ready to Checkout!</p>
//           <button onClick={handleCheckout}>Proceed to Payment</button>
//         </>
//       )}
//     </div>
//   )
// }

// export default Payment
