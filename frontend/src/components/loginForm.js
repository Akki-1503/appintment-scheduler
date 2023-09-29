import React, {useState} from "react"
import { useDispatch } from "react-redux"
import { startLoginUser } from "../actions/userAction"

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