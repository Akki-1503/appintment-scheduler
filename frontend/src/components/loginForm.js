// import React, {useState} from "react"
// import { useDispatch } from "react-redux"
// import { useHistory } from 'react-router-dom'
// import { startLoginUser } from "../actions/userAction"

// function LoginForm() {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     })

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name] : e.target.value
//         })
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         dispatch(startLoginUser(formData, history))
//         //history.push('/account')
//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Email   <br />
//                     <input type= 'email' name= 'email' placeholder='email' value={formData.email} onChange={handleChange} />
//                 </label> <br />

//                 <label>
//                     Password    <br />
//                     <input type= 'password' name= 'password' placeholder='password' value={formData.password} onChange={handleChange} />
//                 </label> <br />

//                 <input type="submit" value='login' />
//             </form>
//         </div>
//     )
// }

// export default LoginForm






// import { useDispatch, useSelector } from 'react-redux';
// import { useState } from 'react';
// import { startLoginUser } from '../actions/userAction';
// import { useHistory } from 'react-router-dom';

// function LoginForm() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const error = useSelector((state) => state.user.error);

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(startLoginUser(formData, history));
//   };

//   const handleClick = () => {
//     history.push('/'); // Redirect to home page
//   };

//   return (
//     <div>
//       {error && <p className="error-message">{error}</p>}
//       {error && (
//         <button className="ok-button" onClick={handleClick}>
//           OK
//         </button>
//       )}
//       <form onSubmit={handleSubmit}>
//         <label>Email: </label> <br />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//         /> <br />

//         <label>Password: </label> <br />
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//         /> <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default LoginForm;





import { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { startLoginUser } from '../actions/userAction';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state) => state.user.error);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoginUser(formData, history));
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label> <br />
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              /> <br />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label> <br />
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              /> <br />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
