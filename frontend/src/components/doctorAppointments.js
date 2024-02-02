import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, ListGroup, Spinner } from 'react-bootstrap'
import moment from 'moment-timezone'
import { useHistory } from 'react-router-dom'
import { startFetchDoctorAppointments, startCancelAppointment, startConfirmAppointment } from '../actions/drAppointmentsAction'
import { startFetchDoctorProfile } from '../actions/drAction'

function DoctorAppointments() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  
  const user = useSelector((state) => state.user)
  useEffect(() => {
    if (user.user) {
      dispatch(startFetchDoctorProfile(user.user._id))
    }
  }, [dispatch, user])
  
  const doctorId = useSelector((state) => state.doctor.doctorProfiles)
  
  const appointments = useSelector((state) => state.doctorAppointments.appointments)
  useEffect(() => {
    if (doctorId) {
      dispatch(startFetchDoctorAppointments(doctorId))
        .then(() => setLoading(false))
        .catch((error) => {
          console.error('Error fetching appointments:', error)
          setLoading(false)
        })
    }
  }, [dispatch, doctorId])

  const handleConfirm = (id) => {
    dispatch(startConfirmAppointment(id))
    window.alert('Successfully sent a confirmation mail')
    history.push('/my-appointments')
  }

  const handleCancel = (id) => {
    dispatch(startCancelAppointment(id))
    window.alert('Successfully sent a cancellation mail')
    history.push('/my-appointments')
  }

  const currentDate = moment().startOf('day')

  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDateTime = moment.utc(appointment.startDateTime)
    return appointmentDateTime.isSameOrAfter(currentDate) && appointment.confimationStatus !== "cancelled"
  })

  return (
    <Container>
      <h2>My Appointments</h2>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : filteredAppointments.length > 0 ? (
        <ListGroup>
          {filteredAppointments.map((appointment, index) => {
            const appointmentDateTime = moment.utc(appointment.startDateTime)
            const ISTDateTime = appointmentDateTime.tz('Asia/Kolkata').subtract(5, 'hours').subtract(30, 'minutes').format('dddd, MMMM D, YYYY h:mm A')
            return (
              <ListGroup.Item key={index}>
                <p>Patient Name: {appointment.patientName}</p>
                <p>Booked Time Slot: {ISTDateTime}</p>
                <Button variant="success" onClick={() => handleConfirm(appointment._id)} disabled={appointment.confimationStatus === "confirmed"} >Confirm</Button>
                <Button variant="danger" onClick={() => handleCancel(appointment._id)}>Cancel</Button>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      ) : (
        <p>No Appointments Available</p>
      )}
    </Container>
  )
}

export default DoctorAppointments
