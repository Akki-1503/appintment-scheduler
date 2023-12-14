// import React, { useState } from 'react'
// import { useHistory , Link} from 'react-router-dom'
// import {useDispatch} from 'react-redux'
// import { startRegisteruser } from '../actions/userAction'

// function RegistrationForm() {
//     const history = useHistory()
//     const dispatch = useDispatch()
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         role: ''
//     })

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name] : e.target.value 
//         })
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         dispatch(startRegisteruser(formData,history))
//         //history.push('/login')
//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Username <br />
//                     <input type= 'username' name= 'username' placeholder='username' value={formData.username} onChange={handleChange} /> <br />
//                 </label>

//                 <label>
//                     Email <br />
//                     <input type= 'email' name= 'email' placeholder='email' value={formData.email} onChange={handleChange} /> <br />
//                 </label>

//                 <label>
//                     Password  <br />
//                     <input type= 'password' name= 'password' placeholder='password' value={formData.password} onChange={handleChange} /> <br />
//                 </label>

//                 <label>
//                     Role  <br />
//                     <select name='role' value={formData.role} onChange={handleChange}>
//                         <option>Register as</option>
//                         <option value='patient'>Patient</option>
//                         <option value='doctor'>Doctor</option>
//                     </select>
//                 </label>
                
//                 <input type='submit' value='register' />
//                 <p>Already have an account? <Link to="/login">Login</Link></p>
//             </form>
//         </div>
//     )
// }

// export default RegistrationForm



import React, { useState } from 'react'
import { useHistory , Link} from 'react-router-dom'
import { useHistory , Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { startRegisteruser } from '../actions/userAction'

function RegistrationForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value 
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(startRegisteruser(formData,history))
        //history.push('/login')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username
                    <input type= 'username' name= 'username' placeholder='username' value={formData.username} onChange={handleInputChange} />
                </label>

                <label>
                    Email
                    <input type= 'email' name= 'email' placeholder='email' value={formData.email} onChange={handleInputChange} />
                </label>

                <label>
                    Password
                    <input type= 'password' name= 'password' placeholder='password' value={formData.password} onChange={handleInputChange} />
                </label>
                
                <input type='register'/>
            </form>
        </div>
    )
}

export default RegistrationForm
