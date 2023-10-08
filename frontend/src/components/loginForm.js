import React, {useState} from "react"
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { startLoginUser } from "../actions/userAction"

function LoginForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(startLoginUser(formData, history))
        //history.push('/account')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email   <br />
                    <input type= 'email' name= 'email' placeholder='email' value={formData.email} onChange={handleChange} />
                </label> <br />

                <label>
                    Password    <br />
                    <input type= 'password' name= 'password' placeholder='password' value={formData.password} onChange={handleChange} />
                </label> <br />

                <input type="submit" value='login' />
            </form>
        </div>
    )
}

export default LoginForm
