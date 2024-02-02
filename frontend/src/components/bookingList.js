import React from 'react'
import { useBookingContext } from './bookingContext'
import { Spinner, Alert, ListGroup } from 'react-bootstrap'

const BookingsList = () => {
  const { bookings, loading, error } = useBookingContext()

  if (loading) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>
  }

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found for this patient.</p>
      ) : (
        <ListGroup>
          {bookings.map((booking) => (
            <ListGroup.Item key={booking._id}>
              <strong>Doctor Name:</strong> {booking.doctorName}<br />
              <strong>Start Time:</strong> {booking.startDateTime}<br />
              <strong>End Time:</strong> {booking.endDateTime}<br />
              <strong>Interval:</strong> {booking.interval} minutes<br />
              <strong>Confirmation Status:</strong> {booking.confirmationStatus}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  )
}

export default BookingsList
