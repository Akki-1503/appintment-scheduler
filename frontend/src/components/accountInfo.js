// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { startGetUserAccount, } from '../actions/userAction'
// //import { Link } from 'react-router-dom/cjs/react-router-dom.min'  

// function AccountInfo() {
//   const dispatch = useDispatch()
//   const user = useSelector((state) => state.user.user) // Assuming user data is stored in the Redux state
//   const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
//   const role = useSelector((state) => state.user.role)
  

//   useEffect(() => {
//     // Dispatch the account retrieval action when the component mounts
//     dispatch(startGetUserAccount())
//     //dispatch(startSetUserRole())
//   }, [dispatch])

//   console.log('User:', user)
//   console.log('IsAuthenticated:', isAuthenticated)
//   console.log('role', role)

//   return (
//     <div>
//       <h2>Account Information</h2>
//       { isAuthenticated ? (
//         <div>
//           <p>Username: {user.username}</p>
//           <p>Email: {user.email}</p>

//           {/* {role === 'doctor' && (
//             <>

//             </>
//           )} */}
//         </div>
//       ) : (
//         <p>Please log in to view your account information.</p>
//       )}
//     </div>
//   )
// } 

// export default AccountInfo





import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGetUserAccount } from '../actions/userAction';
import { Container, Row, Col, Alert } from 'react-bootstrap'; // Import Bootstrap components

function AccountInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Assuming user data is stored in the Redux state
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    // Dispatch the account retrieval action when the component mounts
    dispatch(startGetUserAccount());
    //dispatch(startSetUserRole());
  }, [dispatch]);

  return (
    <Container>
      <h2>Account Information</h2>
      {isAuthenticated ? (
        <Row>
          <Col>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </Col>
        </Row>
      ) : (
        <Alert variant="warning">Please log in to view your account information.</Alert>
      )}
    </Container>
  );
}

export default AccountInfo;
