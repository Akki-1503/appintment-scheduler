import React, { useEffect, useState } from 'react'
import { startFetchDoctorProfile } from '../actions/drAction'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

function DoctorProfile({ doctorId }) {
  const dispatch = useDispatch()
  const [avatarSrc, setAvatarSrc] = useState('')

  const doctorProfiles = useSelector((state) => state.doctor.doctorProfiles)
  console.log('docpro', doctorProfiles)

  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (user.user) {
      dispatch(startFetchDoctorProfile(user.user._id))
    }
  }, [user])

  useEffect(() => {
    console.log('Doctor Profiles:', doctorProfiles)
    if (doctorProfiles && doctorProfiles.avatarUrl) { 
      setAvatarSrc(doctorProfiles.avatarUrl) 
    }
  }, [doctorProfiles])        

  return (
    <div>
      <h2>My Profile</h2>
      {doctorProfiles ? (
        <Card>
          <Card.Body>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {console.log(avatarSrc, 'avatarsrc')}
              {avatarSrc && (
                <img
                  src={avatarSrc}
                  alt="Doctor Avatar"
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              )}
            </div>
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
  )
}

export default DoctorProfile
