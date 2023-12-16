import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Container } from 'react-bootstrap';
import { startCreateSlots } from '../actions/slotsAction';

function CreateSlots() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    interval: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = {
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      interval: formData.interval,
    };

    dispatch(startCreateSlots(updatedFormData));
  };

  return (
    <Container>
      <h2>Create Slots</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date:</Form.Label>
          <Form.Control type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>End Date:</Form.Label>
          <Form.Control type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="startTime">
          <Form.Label>Start Time:</Form.Label>
          <Form.Control type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="endTime">
          <Form.Label>End Time:</Form.Label>
          <Form.Control type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="interval">
          <Form.Label>Interval (in minutes):</Form.Label>
          <Form.Control type="number" name="interval" value={formData.interval} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Slots
        </Button>
      </Form>
    </Container>
  );
}

export default CreateSlots;
