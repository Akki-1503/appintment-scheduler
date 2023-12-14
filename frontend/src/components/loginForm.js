// import React, {useState} from "react"
// import { useDispatch } from "react-redux"
// import { useHistory } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
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
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(startLoginUser(formData))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input type= 'email' name= 'email' placeholder='email' value={formData.email} onChange={handleInputChange} />
                </label>

                <label>
                    Password
                    <input type= 'password' name= 'password' placeholder='password' value={formData.password} onChange={handleInputChange} />
                </label>

                <input type="login" />
            </form>
        </div>
    )
}

export default LoginForm