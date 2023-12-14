// import axios from "axios"

// export const startInitiatePayment = (doctorId, slotId) => {
//     return async(dispatch) => {
//         try {
//           const response = await axios.post('http://localhost:3321/api/checkout', {
//             doctorId,
//             slotId,
//           },{
//               headers: {'Authorization': localStorage.getItem('token')}
//           });
//           console.log('payment response', response)
//           const paymentUrl = response.data.paymentUrl;
//           dispatch(initiatePayment(paymentUrl))
//           console.log('paymenturl', paymentUrl)
//           dispatch({ type: 'PAYMENT_SUCCESS', payload: { paymentUrl } });
//         } catch (error) {
//           console.error('Payment initiation error:', error.response); // Log the error response for debugging
//           dispatch({ type: 'PAYMENT_FAILURE', payload: { error: 'payment initiation failed' } });
//         }
//     }
// }

// const initiatePayment = (data) => {
//   return{type: 'INITIATE_PAYMENT', payload: data }
// }
