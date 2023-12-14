// import React, { useEffect} from 'react'
// import { useDispatch, useSelector } from "react-redux"
// //import { useHistory } from 'react-router-dom'
// import { startFetchDoctors } from '../actions/drAction'
// import { Link } from 'react-router-dom/cjs/react-router-dom.min'

// function DoctorsList() {
//     const dispatch = useDispatch()
//     //const history = useHistory()

//     const doctors = useSelector((state) => state.doctor.doctorProfiles)

//     useEffect(() => {
//         dispatch(startFetchDoctors())
//     }, [dispatch])

//     return(
//         <div>
//             <h2>List of Doctors</h2>
//             <ul>
//                 {Object.keys(doctors).map((doctorId) => {
//                     const doctor = doctors[doctorId]
//                     return(
//                     <div key={doctorId}>
//                         <li>
//                             <h3>
//                                 <Link to={`/list-slots/${doctorId}`}>{doctor.doctorName}</Link>
//                             </h3>
//                             <p>Specialization: {doctor.specialization}</p>
//                             <p>Services Offered: {doctor.servicesByDoctor}</p>
//                             <p>Clinic: {doctor.clinicName}</p>
//                             <p>Clinic Address: {doctor.clinicAddress}</p>
//                             <p>Contact: {doctor.contact}</p>
//                             <p>Education: {doctor.education}</p>
//                             <p>Experience: {doctor.experience}</p>
//                             <p>Consultation Fee: {doctor.consultationFee}</p>
//                         </li>
//                     </div>
//                     )
//                     })}          
//             </ul>
//         </div>
//     )
// }

// export default DoctorsList




import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchDoctors } from '../actions/drAction';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

function DoctorsList() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor.doctorProfiles);

  useEffect(() => {
    dispatch(startFetchDoctors());
  }, [dispatch]);

  return (
    <div>
      <h2>List of Doctors</h2>
      <ListGroup>
        {Object.keys(doctors).map((doctorId) => {
          const doctor = doctors[doctorId];
          return (
            <div key={doctorId}>
              <ListGroup.Item>
                <h3>
                  <Link to={`/list-slots/${doctorId}`}>{doctor.doctorName}</Link>
                </h3>
                <p>Specialization: {doctor.specialization}</p>
                <p>Services Offered: {doctor.servicesByDoctor}</p>
                <p>Clinic: {doctor.clinicName}</p>
                <p>Clinic Address: {doctor.clinicAddress}</p>
                <p>Contact: {doctor.contact}</p>
                <p>Education: {doctor.education}</p>
                <p>Experience: {doctor.experience}</p>
                <p>Consultation Fee: {doctor.consultationFee}</p>
              </ListGroup.Item>
            </div>
          );
        })}
      </ListGroup>
    </div>
  );
}

export default DoctorsList;
