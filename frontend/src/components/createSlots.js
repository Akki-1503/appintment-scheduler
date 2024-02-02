import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import { startCreateSlots } from '../actions/slotsAction'
import { useHistory } from 'react-router-dom' 

function CreateSlots() {
  const dispatch = useDispatch()
  const history = useHistory() 

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    interval: '',
  })

  const [formErrors, setFormErrors] = useState({
    startDate: false,
    endDate: false,
    startTime: false,
    endTime: false,
    interval: false,
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
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      interval: formData.interval,
    }

    dispatch(startCreateSlots(updatedFormData, history))
  }

  const currentDate = new Date().toISOString().split('T')[0]

  return (
    <Container>
      <h2>Create Slots</h2>
      {Object.values(formErrors).includes(true) && (
        <Alert variant="danger">Please fill out the form and try to submit again.</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date:</Form.Label>
          <Form.Control type="date" name="startDate" value={formData.startDate} onChange={handleChange} min={currentDate} isInvalid={formErrors.startDate} />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>End Date:</Form.Label>
          <Form.Control type="date" name="endDate" value={formData.endDate} onChange={handleChange}  min={formData.startDate} isInvalid={formErrors.endDate} />
        </Form.Group>

        <Form.Group controlId="startTime">
          <Form.Label>Start Time:</Form.Label>
          <Form.Control type="time" name="startTime" value={formData.startTime} onChange={handleChange} isInvalid={formErrors.startTime} />
        </Form.Group>

        <Form.Group controlId="endTime">
          <Form.Label>End Time:</Form.Label>
          <Form.Control type="time" name="endTime" value={formData.endTime} onChange={handleChange} isInvalid={formErrors.endTime} />
        </Form.Group>

        <Form.Group controlId="interval">
          <Form.Label>Interval (in minutes):</Form.Label>
          <Form.Control type="number" name="interval" value={formData.interval} onChange={handleChange} isInvalid={formErrors.interval} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Slots
        </Button>
      </Form>
    </Container>
  )
}

export default CreateSlots
