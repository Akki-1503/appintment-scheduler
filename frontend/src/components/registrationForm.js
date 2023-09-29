import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { startRegisteruser } from '../actions/userAction'

function RegistrationForm() {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        username: '',
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
        dispatch(startRegisteruser(formData))
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