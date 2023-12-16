import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startListSlots, startRequestSlot } from '../actions/slotsAction';
import moment from 'moment-timezone';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import Payment from './payment';

function ListSlots() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: doctorId } = useParams();
  console.log('doctorId', doctorId);

  const slots = useSelector((state) => state.slots.slots);
  console.log('slots', slots);

  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    dispatch(startListSlots(doctorId));
  }, [dispatch, doctorId]);

  const convertToIST = (utcTime) => {
    return moment(utcTime).format('LLLL');
  };

  const handleBook = (slotId) => {
    console.log('Selected Slot ID:', slotId); // Log selected slot ID
    setSelectedSlot(slotId);
    // history.push('/payment');
    const selectedSlot = slots.find(slot => slot._id === slotId);
    console.log('selectedSlot', selectedSlot)
    if (selectedSlot) {
      history.push('/payment');
      dispatch(startRequestSlot(slotId));
      console.log('dispatch', dispatch)
    } else {
      console.error('Slot not found with ID:', slotId); // Log if slot ID not found
    }  };

  return (
    <div>
      <h2>Doctor Slots</h2>
      {slots.map((slot) => {
        const startDateTimeIST = convertToIST(slot.startDateTime);
        const endDateTimeIST = convertToIST(slot.endDateTime);

        return (
          <Card key={slot._id} style={{ margin: '10px 0' }}>
            <Card.Body>
              <Card.Title>Date & Time: {startDateTimeIST}</Card.Title>
              <Card.Text>End Date & Time: {endDateTimeIST}</Card.Text>
              <Card.Text>Interval: {slot.interval}</Card.Text>
              <Card.Text>Status: {slot.isBooked ? 'Booked' : 'Available'}</Card.Text>

              {!slot.isBooked && (
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
        );
      })}
      {selectedSlot && <Payment doctorId={doctorId} slotId={selectedSlot} />}
    </div>
  );
}

export default ListSlots;
