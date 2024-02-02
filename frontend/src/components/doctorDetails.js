import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startFetchDoctors } from '../actions/drAction'
import { Link } from 'react-router-dom'
import { startRemoveDoctor } from '../actions/drAction'
import { ListGroup, Form, Image, Button } from 'react-bootstrap'

function DoctorsList() {
  const dispatch = useDispatch()
  const doctorProfiles = useSelector((state) => state.doctor.doctorProfiles)
  const isAdmin = useSelector((state) => state.user.role === 'admin')
  console.log('isAdmin', isAdmin)
  console.log('doctorProfiles', doctorProfiles)

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    dispatch(startFetchDoctors())
  }, [dispatch])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const filteredDoctors = Object.values(doctorProfiles).filter((doctor) => {
    const lowerCaseQuery = searchQuery.toLowerCase()
    return (
      (doctor?.doctorName && doctor.doctorName.toLowerCase().includes(lowerCaseQuery)) ||
      (doctor?.specialization && doctor.specialization.some(spec => spec.toLowerCase().includes(lowerCaseQuery)))
    )
  })

  const handleRemoveDoctor = (doctorId) => {
    // Dispatch action to remove doctor
    dispatch(startRemoveDoctor(doctorId))
  }

  return (
    <div>
      <Form.Group controlId="searchForm">
        <Form.Control
          type="text"
          placeholder="Search by Doctor Name or Specialization"
          value={searchQuery}
          onChange={handleSearch}
        />
      </Form.Group>
      
      <h2>List of Doctors</h2>
      
      <ListGroup>
        {filteredDoctors.map((doctor) => (
          <div key={doctor?.userId}>
            <ListGroup.Item>
              <h3>
                <Link to={`/list-slots/${doctor?.userId}`}>{doctor?.doctorName}</Link>
              </h3>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {console.log('Doctor Avatar URL:', doctor.avatarUrl)}
                {console.log('Rendered HTML:', document.body.innerHTML)}
                {doctor?.avatarUrl && (
                  <img
                    src={doctor.avatarUrl} 
                    alt="Doctor Avatar"
                    style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => console.error('Error loading image:', e)}
                  />
                )}
              </div>

              <p>Specialization: {doctor?.specialization}</p>
              <p>Services Offered: {doctor?.servicesByDoctor}</p>
              <p>Clinic: {doctor?.clinicName}</p>
              <p>Clinic Address: {doctor?.clinicAddress}</p>
              <p>Contact: {doctor?.contact}</p>
              <p>Education: {doctor?.education}</p>
              <p>Experience: {doctor?.experience}</p>
              <p>Consultation Fee: {doctor?.consultationFee}</p>

              {isAdmin && (
                <Button variant="danger" onClick={() => handleRemoveDoctor(doctor?.userId)}>Remove Doctor</Button>
              )}

            </ListGroup.Item>
          </div>
        ))}
      </ListGroup>
    </div>
  )
}

export default DoctorsList
