import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startListSlots, startRequestSlot } from '../actions/slotsAction'
import moment from 'moment-timezone'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Alert, Card } from 'react-bootstrap'
import Payment from './payment'

function ListSlots() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { userId } = useParams()

  const userRole = useSelector((state) => state.user.role) 
  useEffect(() => {
    if (userId) {
      dispatch(startListSlots(userId))
    }
  }, [dispatch, userId])

  const slots = useSelector((state) => state.slots.slots)
  const today = new Date()

  const filteredSlots = slots.filter((slot) => {
    const slotDate = new Date(slot.startDateTime)
    return slotDate > today
  })

  const [selectedSlot, setSelectedSlot] = useState(null)

  const handleBook = (slotId) => {
    setSelectedSlot(slotId)
    dispatch(startRequestSlot(slotId, navigateToPayment))
  }

  const navigateToPayment = () => {
    history.push('/payment')
  }

  return (
    <div>
      {filteredSlots.length === 0 && (
        <Alert variant='danger'>No upcoming slots found for this doctor.</Alert>
      )}

      {filteredSlots.map((slot) => {
        const startDateTimeIST = moment(slot.startDateTime).format('LLLL')
        const endDateTimeIST = moment(slot.endDateTime).format('LLLL')
        return (
          <Card key={slot._id} style={{ margin: '10px 0' }}>
            <Card.Body>
              <Card.Title>Date & Time: {startDateTimeIST}</Card.Title>
              <Card.Text>End Date & Time: {endDateTimeIST}</Card.Text>
              <Card.Text>Interval: {slot.interval}</Card.Text>
              <Card.Text>Status: {slot.isBooked ? 'Booked' : 'Available'}</Card.Text>
              {slot.isBooked && <Card.Text>Booked By: {slot.bookedByUsername}</Card.Text>}

              {/* Conditionally render the button based on the user's role */}
              {!slot.isBooked && userRole !== 'doctor' && (
                <Button
                  onClick={() => handleBook(slot._id)}
                  disabled={slot.isBooked}
                  variant="primary"
                >
                  Book Appointment
                </Button>
              )}
            </Card.Body>
          </Card>
        )
      })}
      {selectedSlot && <Payment doctorId={userId} slotId={selectedSlot} />}
    </div>
  )
}

export default ListSlots
