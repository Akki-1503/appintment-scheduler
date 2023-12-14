// import React, {useEffect} from "react"
// import { startFetchDoctorAppointments } from "../actions/drAppointmentsAction"
// import { useDispatch, useSelector } from "react-redux"

// function DoctorAppointments() {
//     const dispatch = useDispatch()
//     const doctorId = useSelector((state)=> state.doctor.doctorProfiles)
//     console.log('doctorId', doctorId)
//     const appointments = useSelector((state)=> state.doctorAppointments.appointments)
//     console.log('appointments', appointments)

//     useEffect(() => {
//         dispatch(startFetchDoctorAppointments(doctorId))
//     }, [dispatch, doctorId])

//     return(
//         <div>
//             <h2>My Appointments</h2>
//             {appointments ? (
//                 <ul>
//                     {appointments.map((appointment) => {
//                         return(
//                             <li>
//                                 Patient Name: {appointment.patient.name} <br />
//                                 Booked Time Slot: {`${appointment.startTime}`}
//                             </li>
//                         )
//                     })}
//                 </ul>
//             ):(
//                 <p>No Appointments Available</p>
//             )}
//         </div>
//     )
// }

// export default DoctorAppointments





import React, { useEffect } from 'react';
import { startFetchDoctorAppointments } from '../actions/drAppointmentsAction';
import { useDispatch, useSelector } from 'react-redux';
import { Container, ListGroup } from 'react-bootstrap';

function DoctorAppointments() {
  const dispatch = useDispatch();
  const doctorId = useSelector((state) => state.doctor.doctorProfiles);
  const appointments = useSelector((state) => state.doctorAppointments.appointments);

  useEffect(() => {
    dispatch(startFetchDoctorAppointments(doctorId));
  }, [dispatch, doctorId]);

  return (
    <Container>
      <h2>My Appointments</h2>
      {appointments ? (
        <ListGroup>
          {appointments.map((appointment, index) => {
            return (
              <ListGroup.Item key={index}>
                <p>Patient Name: {appointment.patient.name}</p>
                <p>Booked Time Slot: {`${appointment.startTime}`}</p>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <p>No Appointments Available</p>
      )}
    </Container>
  );
}

export default DoctorAppointments;
