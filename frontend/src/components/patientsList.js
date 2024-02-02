import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Card, Spinner, Alert } from 'react-bootstrap'

const DoctorPatientsList = () => {
  const [doctor, setDoctor] = useState(null)
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const doctorId = useSelector((state) => state.user.user?._id)

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`http://localhost:3321/api/doctors/list-patients/${doctorId}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        })
        setDoctor(response.data.doctor)
        const adjustedPatients = response.data.patients.map(patient => ({
          ...patient,
          dateAndTime: adjustDateTime(patient.dateAndTime)
        }))
        setPatients(adjustedPatients)
      } catch (error) {
        setError('An error occurred while fetching data')
      } finally {
        setLoading(false)
      }
    }

    fetchPatients()
  }, [doctorId])

  const adjustDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString)
    dateTime.setHours(dateTime.getHours() - 5)
    dateTime.setMinutes(dateTime.getMinutes() - 30)
    return dateTime.toLocaleString()
  }

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>
  }

  return (
    <div>
      <h2>Patients List</h2>
      {patients.length === 0 ? (
        <Alert variant="info">No patients found for this doctor.</Alert>
      ) : (
        <div>
          {patients.map((patient,index) => (
            <Card key={index} style={{ marginBottom: '10px' }}>
              <Card.Body>
                <Card.Title>Patient Name: {patient.patientUsername}</Card.Title>
                <Card.Text>
                  <strong>Patient Email:</strong> {patient.patientEmail} <br />
                  <strong>Date & Time:</strong> {patient.dateAndTime} <br />
                  <strong>Confirmation Status:</strong> {patient.confimationStatus}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default DoctorPatientsList
