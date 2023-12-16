import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, ListGroup } from 'react-bootstrap';

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3321/api/doctors/list', {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchData();
  }, []);

  const handleVerifyDoctor = async (doctorId) => {
    try {
      const verifiedDoc = await axios.put(`http://localhost:3321/api/doctor/verify/${doctorId}`, { isVerified: true }, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      console.log('verified Doc', verifiedDoc);
    } catch (error) {
      console.error('Error verifying doctor:', error);
    }
  };

  return (
    <Container>
      <h1>Registered Doctors</h1>
      <ListGroup>
        {doctors.map((doctor) => (
          <ListGroup.Item key={doctor._id}>
            {doctor.doctorName} - {doctor.email}
            {!doctor.isVerified && (
              <Button onClick={() => handleVerifyDoctor(doctor._id)} variant="success">Verify</Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default AdminDashboard;
