// import React, { useEffect } from "react";
// import { startFetchDoctorProfile } from "../actions/drAction"
// import { useDispatch, useSelector } from "react-redux";

// function DoctorProfile() {
//   const dispatch = useDispatch();
//   const doctorId = useSelector((state) => state.doctor.doctorProfiles._id);

//   useEffect(() => {
//     dispatch(startFetchDoctorProfile(doctorId));
//   }, [dispatch, doctorId]);

//   const doctorProfiles = useSelector((state) => state.doctor.doctorProfiles._id)
//   console.log('doctorProfiles', doctorProfiles)

//   return (
//     <div>
//       <h2>My Profile</h2>
//         {doctorProfiles ? (
//             <div> 
//                 <h3>{doctorProfiles.doctorName}</h3>
//                 <p>Contact: {doctorProfiles.contact}</p>
//                 <p>Clinic: {doctorProfiles.clinicName}</p>
//                 <p>Clinic Address: {doctorProfiles.clinicAddress}</p>
//                 <p>Specialization: {doctorProfiles.specialization}</p>
//                 <p>Education: {doctorProfiles.education}</p>
//                 <p>Experience: {doctorProfiles.experience}</p>
//                 <p>Consultation Fee: {doctorProfiles.consultationFee}</p>
//                 <p>Services Offered: {doctorProfiles.servicesByDoctor}</p>
//                 <p>Gender: {doctorProfiles.gender}</p>
//             </div>
//         ):(
//             <p>loading...</p>
//         )}
//     </div>
//   )
// }

// export default DoctorProfile



// import React, { useEffect } from "react";
// import { startFetchDoctorProfile } from "../actions/drAction";
// import { useDispatch, useSelector } from "react-redux"
// import { Link } from "react-router-dom/cjs/react-router-dom";

// function DoctorProfile({ doctorId }) {
//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   if(doctorId){
//   //       dispatch(startFetchDoctorProfile(doctorId))
//   //   }
//   // }, [dispatch, doctorId]);

//   const doctorProfiles = useSelector((state) => state.doctor.doctorProfiles)
//   //  console.log('doctorProfiles', doctorProfiles)
//   const user = useSelector((state) => {
//     return state.user
//   })

//   useEffect(() => {
//     if(user.user) {
//       dispatch(startFetchDoctorProfile(user.user._id))
//     }
   
//   }, [user])

//   return (
//     <div>
//       <h2>My Profile</h2>
//       {doctorProfiles ? (
//         <div> 
//           <h3>{doctorProfiles.doctorName}</h3>
//           <p>Contact: {doctorProfiles.contact}</p>
//           <p>Clinic: {doctorProfiles.clinicName}</p>
//           <p>Clinic Address: {doctorProfiles.clinicAddress}</p>
//           <p>Specialization: {doctorProfiles.specialization}</p>
//           <p>Education: {doctorProfiles.education}</p>
//           <p>Experience: {doctorProfiles.experience}</p>
//           <p>Consultation Fee: {doctorProfiles.consultationFee}</p>
//           <p>Services Offered: {doctorProfiles.servicesByDoctor}</p>
//           <p>Gender: {doctorProfiles.gender}</p>
//           <Link to={`/edit-profile/${doctorId}`}>Edit Profile</Link>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default DoctorProfile;




import React, { useEffect } from 'react';
import { startFetchDoctorProfile } from '../actions/drAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

function DoctorProfile({ doctorId }) {
  const dispatch = useDispatch();

  //   const user = useSelector((state) => {
//     return state.user
//   })

//   useEffect(() => {
//     if(user.user) {
//       dispatch(startFetchDoctorProfile(user.user._id))
//     }
   
//   }, [user])

const doctorProfiles = useSelector((state) => state.doctor.doctorProfiles);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.user) {
      dispatch(startFetchDoctorProfile(user.user._id));
    }
  }, [user]);

  return (
    <div>
      <h2>My Profile</h2>
      {doctorProfiles ? (
        <Card>
          <Card.Body>
            <Card.Title>{doctorProfiles.doctorName}</Card.Title>
            <Card.Text>
              Contact: {doctorProfiles.contact} <br />
              Clinic: {doctorProfiles.clinicName} <br />
              Clinic Address: {doctorProfiles.clinicAddress} <br />
              Specialization: {doctorProfiles.specialization} <br />
              Education: {doctorProfiles.education} <br />
              Experience: {doctorProfiles.experience} <br />
              Consultation Fee: {doctorProfiles.consultationFee} <br />
              Services Offered: {doctorProfiles.servicesByDoctor} <br />
              Gender: {doctorProfiles.gender} <br />
            </Card.Text>
            <Link to={`/edit-profile/${doctorId}`}>
              <Button>Edit Profile</Button>
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DoctorProfile;
