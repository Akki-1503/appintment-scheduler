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
