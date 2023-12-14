// const initialState = {
//     loading: false,
//     error: null,
//     paymentUrl: null,
// };

// const paymentReducer = (state= initialState, action) => {
//     switch (action.type) {
//       case 'INITIATE_PAYMENT':
//         console.log('action initiate', action)
//         return {
//           ...state,
//           loading: true,
//           error: null,
//           paymentUrl: null,
//         };
//       case 'PAYMENT_SUCCESS':
//         console.log('action payment', action)
//         return {
//           ...state,
//           loading: false,
//           error: null,
//           paymentUrl: action.payload.paymentUrl,
//         };
//       case 'PAYMENT_FAILURE':
//         return {
//           ...state,
//           loading: false,
//           error: action.payload.error,
//           paymentUrl: null,
//         };
//       default:
//         return state;
//     }
//   };
  
// export default paymentReducer
