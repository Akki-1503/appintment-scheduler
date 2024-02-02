import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Button, ListGroup, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([])
  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3321/api/doctors/list', {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        })
        setDoctors(response.data)
      } catch (error) {
        console.error('Error fetching doctors:', error)
      }
    }

    fetchData()
  }, [])

  const handleVerifyDoctor = async (doctorId) => {
    try {
      const verifiedDoc = await axios.put(`http://localhost:3321/api/doctor/verify/${doctorId}`, { isVerified: true }, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      alert('Doctor verified successfully.')
      history.push('/account')
      console.log('verified doc', verifiedDoc)
    } catch (error) {
      console.error('Error verifying doctor:', error)
    }
  }

  return (
    <Container>
      <h1>Registered Doctors</h1>
      {doctors.length === 0 ? (
        <Alert variant="info">No registered doctors found.</Alert>
      ) : (
        <ListGroup>
          {doctors.map((doctor) => (
            <ListGroup.Item key={doctor._id}>
              {doctor.username} - {doctor.email}
              {!doctor.isVerified && (
                <Button onClick={() => handleVerifyDoctor(doctor._id)} variant="success">Verify</Button>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  )
}

export default AdminDashboard
