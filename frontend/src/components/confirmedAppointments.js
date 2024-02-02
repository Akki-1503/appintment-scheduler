import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from 'axios'
import { Dialog, DialogTitle, DialogContent, Container } from '@mui/material'

function ConfirmedAppointmentsCalendar({ userId }) {
  const [confirmedAppointments, setConfirmedAppointments] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState({})

  useEffect(() => {
    const fetchConfirmedAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3321/api/appointments/confirm/${userId}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          },
        })
        const appointmentsIST = response.data.map(appointment => ({
          ...appointment,
          startDateTime: new Date(appointment.startDateTime),
          endDateTime: new Date(appointment.endDateTime),
        }))
        setConfirmedAppointments(appointmentsIST)
      } catch (error) {
        console.error('Error fetching confirmed appointments:', error)
      }
    }

    fetchConfirmedAppointments()
  }, [userId])

  const handleEventMouseEnter = (info) => {
    const appointment = confirmedAppointments.find(appt =>
      appt.startDateTime.getTime() === info.event.start.getTime() && 
      appt.endDateTime.getTime() === info.event.end.getTime()
    )
  
    if (appointment) {
      setDialogContent({
        title: info.event.title,
        start: new Date(appointment.startDateTime), 
        bookedBy: appointment.bookedByUsername,
      })
      setDialogOpen(true)
    }
  }
  
  const handleEventMouseLeave = () => {
    setDialogOpen(false)
  }

  return (
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={confirmedAppointments.map(appointment => ({
          title: 'Appointment',
          start: new Date(appointment.startDateTime), 
          end: appointment.endDateTime
        }))}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        timeZone="UTC"
        validRange={{
          start: new Date(), 
        }}
      />
      <Dialog open={dialogOpen} onClose={handleEventMouseLeave}>
        <DialogTitle>{dialogContent.title}</DialogTitle>
        <DialogContent>
          <p>Start Time: {dialogContent.start && dialogContent.start.toLocaleString('en-US', { timeZone: 'UTC' })}</p>
          <p>Patient Name: {dialogContent.bookedBy}</p>
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default ConfirmedAppointmentsCalendar
