import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { startRegisteruser } from '../actions/userAction'
import { Form, Button, Alert } from 'react-bootstrap'

function RegistrationForm() {
  const history = useHistory()
  const dispatch = useDispatch()
  const error = useSelector((state) => state.user.error)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  })

  const [validationError, setValidationError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      dispatch(startRegisteruser(formData, history))
    }
  }

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.role) {
      setValidationError('All fields are required.')
      return false
    }
    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters long.')
      return false
    }
    setValidationError('')
    return true
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        {validationError && <Alert variant="danger">{validationError}</Alert>}
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control as="select" name="role" value={formData.role} onChange={handleChange}>
            <option>Register as</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>

        <p>Already have an account? <Link to="/login">Login</Link></p>
      </Form>
    </div>
  )
}

export default RegistrationForm
