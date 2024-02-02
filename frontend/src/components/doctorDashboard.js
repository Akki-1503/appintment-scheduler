import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { startUpdateProfile } from '../actions/drAction'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'


function DoctorDashboard() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [formData, setFormData] = useState({
    email: '',
    doctorName: '',
    contact: '',
    clinicName: '',
    clinicAddress: '',
    gender: '',
    education: '',
    experience: '',
    consultationFee: '',
    specialization: '',
    servicesByDoctor: '',
    avatar: ''
  })

  const [formErrors, setFormErrors] = useState({
    email: false,
    doctorName: false,
    contact: false,
    clinicName: false,
    clinicAddress: false,
    gender: false,
    education: false,
    experience: false,
    consultationFee: false,
    specialization: false,
    servicesByDoctor: false,
    avatar: false
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  
  setFormErrors({
    ...formErrors,
    [e.target.name]: false,
  })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

  const missingFields = Object.keys(formData).filter((key) => !formData[key])

  if (missingFields.length > 0) {
    const updatedErrors = {}
    missingFields.forEach((field) => {
      updatedErrors[field] = true
    })
    setFormErrors(updatedErrors)

    return
  }

  const updatedFormData = {
    email: formData.email,
    doctorName: formData.doctorName,
    contact: formData.contact,
    clinicName: formData.clinicName,
    clinicAddress: formData.clinicAddress,
    gender: formData.gender,
    consultationFee: formData.consultationFee,
    specialization: formData.specialization,
    servicesByDoctor: formData.servicesByDoctor,
    education: formData.education,
    experience: formData.experience,
    avatar: formData.avatar,
  }

  dispatch(startUpdateProfile(updatedFormData, history))
    history.push('/account')
  }

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      {Object.values(formErrors).includes(true) && (
        <Alert variant="danger">Please fill out the form and try to submit again.</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            isInvalid={formErrors.email} 
          />
          <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback> 
        </Form.Group>

        <Form.Group controlId="doctorName">
          <Form.Label>Doctor Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Doctor Name"
            value={formData.doctorName}
            name="doctorName"
            onChange={handleChange}
            isInvalid={formErrors.doctorName} 
          />
          <Form.Control.Feedback type="invalid">Doctor Name is required</Form.Control.Feedback> 
        </Form.Group>

        <Form.Group as={Row} controlId="gender">
          <Form.Label as="legend" column sm={2}>
            Gender
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
            />
          </Col>
          {formErrors.gender && (
            <Form.Control.Feedback type="invalid">Gender is required</Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId='clinicName'>
            <Form.Label>Clinic Name</Form.Label>
            <Form.Control 
                type='text'
                placeholder='Clinic Name'
                value={formData.clinicName}
                name='clinicName'
                onChange={handleChange} 
                isInvalid={formErrors.clinicName} 
            />
            <Form.Control.Feedback type="invalid">Clinic Name is required</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='contact'>
            <Form.Label>Contact</Form.Label>
            <Form.Control 
                type='text'
                placeholder='contact'
                value={formData.contact}
                name='contact'
                onChange={handleChange}
                isInvalid={formErrors.contact} 
           />
           <Form.Control.Feedback type="invalid">Contact is required</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='clinicAddress'>
            <Form.Label>Clinic Address</Form.Label>
            <Form.Control 
                type='text'
                placeholder='clinic address'
                value={formData.clinicAddress}
                name='clinicAddress'
                onChange={handleChange} 
                isInvalid={formErrors.clinicAddress} 
            />
            <Form.Control.Feedback type="invalid">Clinic Address is required</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='education'>
            <Form.Label>Education</Form.Label>
            <Form.Control 
                type='text'
                placeholder='education'
                value={formData.education}
                name='education'
                onChange={handleChange} 
                isInvalid={formErrors.education} 
            />
            <Form.Control.Feedback type="invalid">Education is required</Form.Control.Feedback>
        </Form.Group> 

        <Form.Group controlId='experience'>
            <Form.Label>Experience</Form.Label>
            <Form.Control 
                type='text'
                placeholder='experience'
                value={formData.experience}
                name='experience'
                onChange={handleChange} 
                isInvalid={formErrors.experience} 
            />
            <Form.Control.Feedback type="invalid">Experience is required</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='consultationFee'>
            <Form.Label>Consultation Fee</Form.Label>
            <Form.Control 
                type='number'
                placeholder='consultationFee'
                value={formData.consultationFee}
                name='consultationFee'
                onChange={handleChange} 
                isInvalid={formErrors.consultationFee} 
            />
            <Form.Control.Feedback type="invalid">Consultation Fee is required</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='specialization'>
            <Form.Label>Specialization</Form.Label>
            <Form.Control 
                type='text'
                placeholder='specialization'
                value={formData.specialization}
                name='specialization'
                onChange={handleChange} 
                isInvalid={formErrors.specialization} 
            />
            <Form.Control.Feedback type="invalid">Specialization is required</Form.Control.Feedback>
        </Form.Group>
        
        
        <Form.Group controlId='servicesByDoctor'>
            <Form.Label>Services By Doctor</Form.Label>
            <Form.Control 
                type='text'
                placeholder='servicesByDoctor'
                value={formData.servicesByDoctor}
                name='servicesByDoctor'
                onChange={handleChange} 
                isInvalid={formErrors.servicesByDoctor} 
            />
            <Form.Control.Feedback type="invalid">Services By Doctor is required</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="avatar">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
            isInvalid={formErrors.avatar} 
          />
          <Form.Control.Feedback type="invalid">Profile Picture is required</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default DoctorDashboard
