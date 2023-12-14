// import React,{useEffect} from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { startFetchRegisteredDoctor } from "../actions/adminActions"

// const AdminDashboard = () => {
//     const dispatch = useDispatch()
//     const doctors = useSelector((state)=> state.admin.registeredDoctors)

//     // useEffect(() => {
//     //     dispatch(startFetchRegisteredDoctor())
//     // }, [dispatch])

//     if (!doctors || doctors.length === 0) {
//         return <div>No registered doctors found</div>;
//     }

//     return(
//         <div>
//             <h2>Registered Doctors</h2>
//                 <ul>
//                     {doctors.map((doctor) => {
//                         return (
//                             <li key={doctor._id}>{doctor.email}</li>
//                         )
//                     })}
//                 </ul>
//         </div>
//     )

// }

// export default AdminDashboard




// AdminDashboard.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // You might need axios or another library for API requests

// const AdminDashboard = () => {
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     // Fetch list of registered doctors from the backend when the component mounts
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3321/api/doctors/list', {
//             headers: {
//                 'Authorization': localStorage.getItem('token')
//             }
//         }) // Adjust the endpoint to match your backend route
//         setDoctors(response.data)
//         console.log('response doc', response)
//       } catch (error) {
//         console.error('Error fetching doctors:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleVerifyDoctor = async (doctorId) => {
//     try {
//       // Implement logic to verify a doctor by making a PUT request to your backend
//       const verifiedDoc = await axios.put(`http://localhost:3321/api/doctor/verify/${doctorId}`,{isVerified: true}, {
//         headers: {
//             'Authorization': localStorage.getItem('token')
//         }
//       })
//       console.log('verified Doc', verifiedDoc)// Adjust the endpoint for verifying a doctor
//       // After verifying, you might want to refresh the list of doctors or update the UI accordingly
//     } catch (error) {
//       console.error('Error verifying doctor:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Registered Doctors</h1>
//       <ul>
//         {doctors.map((doctor) => (
//           <li key={doctor._id}>
//             {doctor.doctorName} - {doctor.email} 
//             {!doctor.isVerified && (
//               <button onClick={() => handleVerifyDoctor(doctor._id)}>Verify</button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminDashboard;





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
